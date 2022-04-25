import React from 'react'
import { forwardRef } from '../../utils/forward-ref'
import { Spinner } from '../spinner'
import styles from './button.module.css'
import cn from 'clsx'

interface ButtonProps {
  isDisabled?: boolean
  isLoading?: boolean
  loadingText?: string
}

export const Button = forwardRef<ButtonProps, 'button'>((props, ref) => {
  const { isLoading = false, loadingText = 'Loading', isDisabled = false, className, children, ...rest } = props

  if (isLoading) {
    return (
      <button className={cn(styles.button, className)} ref={ref} disabled={true} {...rest}>
        <div className={styles.button__loading_container}>
          <Spinner label={loadingText} className={styles.button__loading_spinner} width="1rem" height="1rem" />
          {loadingText}
        </div>
      </button>
    )
  }

  return (
    <button className={cn(styles.button, className)} ref={ref} disabled={isDisabled} {...rest}>
      {children}
    </button>
  )
})
