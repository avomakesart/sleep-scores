import React from 'react'
import { Spinner } from '../spinner'
import styles from './suspense-spinner.module.css'

export const SuspenseSpinner = () => {
  return (
    <div className={styles['suspense-spinner__container']}>
      <Spinner width="8em" height="8em" />
    </div>
  )
}
