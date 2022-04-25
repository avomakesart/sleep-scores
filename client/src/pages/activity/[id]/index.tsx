import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDeleteScoreMutation, useScoreQuery } from '../../../generated/graphql'
import { Button, Container, SuspenseSpinner } from '../../../components'
import { withApollo } from '../../../utils'
import styles from './activity-id.module.css'
import { formatDate, formatToHours } from '../../../utils/misc'

const ActivityDetails = () => {
  const { id } = useParams()
  const { data, loading, error } = useScoreQuery({ variables: { id: Number(id) } })
  const [deleteScore] = useDeleteScoreMutation()

  const navigate = useNavigate()

  const handleDeleteScore = () => {
    deleteScore({ variables: { id: Number(id) } })
    navigate('/activity', { replace: true })
  }

  if (loading) return <SuspenseSpinner />
  if (error) {
    return (
      <Container p="17rem 0">
        <h3>Something went wrong, try again later...</h3>
      </Container>
    )
  }
  return (
    <Container>
      <div className={styles['activity-id__header--container']}>
        <h2 className={styles['activity-id__header']}>Sleep information</h2>
        <span>
          Full details for score id: <b>{String(data?.score?.id)}</b>
        </span>
      </div>
      <hr className={styles['activity-id__header--separator']} />
      <div className={styles.activity__container}>
        <div className={styles['activity__item--container']}>
          <span className={styles['activity__item--title']}>Duration in bed: </span>
          <span className={styles['activity__item--description']}>
            {formatToHours(Number(data?.score?.duration_in_bed))}
          </span>
        </div>
        <div className={styles['activity__item--container']}>
          <span className={styles['activity__item--title']}>Duration asleep: </span>
          <span className={styles['activity__item--description']}>
            {formatToHours(Number(data?.score?.duration_asleep))}
          </span>
        </div>
        <div className={styles['activity__item--container']}>
          <span className={styles['activity__item--title']}>Score: </span>
          <span className={styles['activity__item--description']}>{String(data?.score?.score)}</span>
        </div>
        <div className={styles['activity__item--container']}>
          <span className={styles['activity__item--title']}>Created at: </span>
          <span className={styles['activity__item--description']}>
            {formatDate(new Date(Number(data?.score?.createdAt)).toDateString())}
          </span>
        </div>
        <div className={styles['activity__item--container']}>
          <span className={styles['activity__item--title']}>Updated at: </span>
          <span className={styles['activity__item--description']}>
            {formatDate(new Date(Number(data?.score?.updatedAt)).toDateString())}
          </span>
        </div>
      </div>

      <div className={styles['activity-id__footer--container']}>
        <Button
          className={styles['activity-id__footer--update_button']}
          onClick={() => navigate(`/activity/update/${id}`)}
        >
          Update
        </Button>
        <Button className={styles['activity-id__footer--delete_button']} onClick={handleDeleteScore}>
          Delete
        </Button>
      </div>
    </Container>
  )
}

export default withApollo({ ssr: false })(ActivityDetails)
