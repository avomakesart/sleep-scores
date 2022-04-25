import React, { useEffect } from 'react'
import { withApollo } from '../../utils'
import { useScoresQuery, Score, ScoreQuery, ScoresQuery } from '../../generated/graphql'
import { BackArrow, Button, Container, MoonIcon, PageHeader, SuspenseSpinner } from '../../components'
import { formatDate, formatToHours } from '../../utils/misc'
import { useNavigate } from 'react-router-dom'
import styles from './activity.module.css'

const Activity = () => {
  const { data, loading, error, fetchMore, variables } = useScoresQuery({ variables: { limit: 4, cursor: null } })
  const navigate = useNavigate()

  if (data?.scores.scores.length === 0) return navigate('/')
  if (loading) return <SuspenseSpinner />
  if (error) {
    return (
      <Container p="17rem 0">
        <h3>Something went wrong, try again later...</h3>
      </Container>
    )
  }
  return (
    <>
      <PageHeader spaceTop="0.5rem" spaceLeft="1rem" spaceRight="1rem" justify="space-between">
        <span style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
          <BackArrow width="1.3em" />
        </span>
        <div>
          <Button onClick={() => navigate('/')}>New sleep score</Button>
        </div>
      </PageHeader>
      <Container maxW="50rem">
        <div className={styles.activity__grid}>
          {data!.scores.scores.map((score) =>
            !score ? null : (
              <div key={score.id} className={styles.activity__card} onClick={() => navigate(`/activity/${score.id}`)}>
                <div className={styles.activity__container}>
                  <div className={styles.activity__content}>
                    <span>
                      <strong className={styles.activity__title}>Duration in bed:</strong>{' '}
                      {formatToHours(Number(score.duration_in_bed))}
                    </span>
                    <span>
                      <strong className={styles.activity__title}>Duration asleep:</strong>{' '}
                      {formatToHours(Number(score.duration_asleep))}
                    </span>
                    <span>
                      <strong className={styles.activity__title}>Score:</strong> {score.score}
                    </span>
                  </div>
                  <MoonIcon width="2rem" height="2rem" />
                </div>

                <div className={styles['activity__footer--container']}>
                  <strong className={styles.activity__title}>Created at:</strong>
                  <span className={styles.activity__date}>
                    {formatDate(new Date(Number(score.createdAt)).toDateString())}
                  </span>
                </div>
              </div>
            ),
          )}
          {data && data.scores.hasMore ? (
            <div>
              <Button
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor: data.scores.scores[data.scores.scores.length - 1].createdAt,
                    },
                    updateQuery: (previousValue, { fetchMoreResult }): ScoresQuery => {
                      if (!fetchMoreResult) {
                        return previousValue as ScoresQuery
                      }

                      return {
                        __typename: 'Query',
                        scores: {
                          __typename: 'PaginatedScores',
                          hasMore: (fetchMoreResult as ScoresQuery).scores.hasMore,
                          scores: [
                            ...(previousValue as ScoresQuery).scores.scores,
                            ...(fetchMoreResult as ScoresQuery).scores.scores,
                          ],
                        },
                      }
                    },
                  })
                }}
              >
                Load more
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </>
  )
}

export default withApollo({ ssr: false })(Activity)
