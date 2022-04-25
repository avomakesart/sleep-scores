import React, { useRef } from 'react'
import { forwardRef } from '../../../utils'
import { useDropdownContext } from '../dropdown'
import styles from './dropdown-item.module.css'
import cn from 'clsx'
import { CheckMark } from '../../icons'

interface DropdownItemProps {
  value: string
}

export const DropdownItem = forwardRef<DropdownItemProps, 'li'>((props, ref) => {
  const { selectedOption, handleSelectedOption } = useDropdownContext()
  const { children, className, value, ...rest } = props

  return (
    <li
      className={cn(styles['dropdown-item__container'], className)}
      onClick={() => handleSelectedOption(value)}
      ref={ref}
      {...rest}
    >
      <div className={styles['dropdown-item__option--container']}>
        <span
          className={cn(styles['dropdown-item__option'], {
            [styles['dropdown-item__option--selected']]: selectedOption === value,
          })}
        >
          {children}
        </span>
      </div>
      <span
        className={styles['dropdown-item__icon--container']}
        style={{ display: selectedOption === value ? '' : 'none' }}
      >
        <CheckMark className={styles['dropdown-item__icon']} />
      </span>
    </li>
  )
})
