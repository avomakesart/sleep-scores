import React, { ReactNode, useState, useRef } from 'react'
import { createContext, forwardRef } from '../../utils'
import { useClickAway } from '../../hooks'
import cn from 'clsx'
import styles from './dropdown.module.css'
import { ArrowUpDown } from '../icons'
import { DropdownLabel } from './dropdown-label'
import { formatToHours } from '../../utils/misc'

export interface DropdownContext {
  selectedOption: string
  handleSelectedOption: (option: string) => void
}

export interface DropdownProps {
  defaultValue?: string
  placeholder?: string
  label?: string
  onSelect: (option: string) => void
}

export const [DropdownContextProvider, useDropdownContext] = createContext<DropdownContext>({
  strict: true,
  name: 'DropdownContextProvider',
  errorMessage:
    'useDropdownContext: `context` is undefined. Seems you forgot to wrap modal components in `<Dropdown />`',
})

export const Dropdown = forwardRef<DropdownProps, 'div'>((props, ref) => {
  const { defaultValue, onSelect, placeholder, label, children, ...rest } = props

  const [selectedOption, setSelectedOption] = useState(defaultValue || '')
  const [showDropdown, setShowDropdown] = useState(false)
  const showDropdownHandler = () => setShowDropdown(!showDropdown)
  const selectPlaceholder = placeholder || 'Choose an option'
  const selectContainerRef = useRef(null)
  const internalRef = ref ? ref : selectContainerRef

  const clickOutsideHandler = () => setShowDropdown(false)

  useClickAway(selectContainerRef, clickOutsideHandler)

  const updateSelectedOption = (option: string) => {
    onSelect(option)
    setSelectedOption(option)
    setShowDropdown(false)
  }

  return (
    <DropdownContextProvider
      value={{
        selectedOption,
        handleSelectedOption: updateSelectedOption,
      }}
    >
      <DropdownLabel>{label}</DropdownLabel>
      <div className={styles.dropdown__container} ref={internalRef} {...rest}>
        <button className={cn(styles.dropdown__button)} onClick={showDropdownHandler}>
          <span className={styles['dropdown__button-text--container']}>
            {selectedOption.length > 0 ? formatToHours(Number(selectedOption)) : selectPlaceholder}
          </span>
          <span className={styles['dropdown__button-icon--container']}>
            <ArrowUpDown className={styles['dropdown__button-icon']} />
          </span>
        </button>
        <ul
          className={cn(styles['drodown__options--container'], {
            [styles['dropdown__show--options']]: showDropdown,
            [styles['dropdown__hide--options']]: !showDropdown,
          })}
          role="listbox"
          aria-labelledby="listbox-label"
        >
          {children}
        </ul>
      </div>
    </DropdownContextProvider>
  )
})
