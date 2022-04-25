import React from 'react'
import { BackArrow, Button, PageHeader } from '../../components'
import { NotFoundIllustration } from '../../components/illustrations/not-found'
import styles from './not-found.module.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

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
      <div className={styles['not-found-page__container']}>
        <NotFoundIllustration width="16rem" height="16rem" />
      </div>
    </>
  )
}

export default NotFound
