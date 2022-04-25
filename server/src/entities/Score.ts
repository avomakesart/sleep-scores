import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Score extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  duration_asleep!: string

  @Field()
  @Column()
  duration_in_bed!: string

  @Field()
  @Column()
  score!: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
