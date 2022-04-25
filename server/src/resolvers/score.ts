import { Arg, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'
import { Score } from '../entities/Score'

@InputType()
class ScoreInput {
  @Field()
  duration_asleep: string
  @Field()
  duration_in_bed: string
  @Field()
  score: string
}

@ObjectType()
class PaginatedScores {
  @Field(() => [Score])
  scores: Score[]
  @Field()
  hasMore: boolean
}

@Resolver(Score)
export class ScoreResolver {
  @Mutation(() => Score)
  async createScore(@Arg('input') input: ScoreInput): Promise<Score> {
    return Score.create({ ...input }).save()
  }

  @Query(() => PaginatedScores)
  async scores(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
  ): Promise<PaginatedScores> {
    const realLimit = Math.min(50, limit)
    const realLimitPlusOne = realLimit + 1

    const replacements: any[] = [realLimitPlusOne]

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)))
    }

    const scores = await getConnection().query(
      `
        select s.*
        from score s
        ${cursor ? `where s."createdAt" < $2` : ''}
        order by s."createdAt" ASC
        limit $1
        `,
      replacements,
    )

    return {
      scores: scores.slice(0, realLimit),
      hasMore: scores.length === realLimitPlusOne,
    }
  }

  @Query(() => Score, { nullable: true })
  score(@Arg('id', () => Int) id: number): Promise<Score | undefined> {
    return Score.findOne(id)
  }

  @Mutation(() => Score, { nullable: true })
  async updateScore(@Arg('id', () => Int) id: number, @Arg('input') input: ScoreInput): Promise<Score | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Score)
      .set({ ...input })
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute()

    return result.raw[0]
  }

  @Mutation(() => String)
  async deleteScore(@Arg('id', () => Int) id: number): Promise<any | string | boolean> {
    await Score.delete({ id })

    return { mesage: 'Score has been deleted successfully', status: true }
  }
}
