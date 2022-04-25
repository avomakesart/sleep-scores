import React from 'react'
import { NotFoundIllustration } from '../../components/illustrations/not-found'
import styles from './not-found.module.css'

const NotFound = () => {
  return (
    <div className={styles['not-found-page__container']}>
      <NotFoundIllustration width="16rem" height="16rem" />
    </div>
  )
}

export default NotFound
