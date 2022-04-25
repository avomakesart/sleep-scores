import React from 'react'
import { forwardRef } from '../../utils'
import { BackArrow } from '../icons'
import styles from './page-header.module.css'
import cn from 'clsx'

interface PageHeaderProps {
  /**
   * The CSS property to justify elements
   */
  justify?: string
  /**
   * The CSS property to add space to top
   */
  spaceTop?: string
  /**
   * The CSS property to add space to bottom
   */
  spaceBottom?: string
  /**
   * The CSS property to add space to left
   */
  spaceLeft?: string
  /**
   * The CSS property to add space to right
   */
  spaceRight?: string
}

export const PageHeader = forwardRef<PageHeaderProps, 'div'>((props, ref) => {
  const { justify = 'space-between', spaceTop, spaceBottom, spaceLeft, spaceRight, className, ...rest } = props

  const pageHeaderStyles: React.CSSProperties = {
    justifyContent: justify,
    marginTop: spaceTop,
    marginBottom: spaceBottom,
    marginLeft: spaceLeft,
    marginRight: spaceRight,
  }

  return <div className={cn(styles.page_header__container, className)} style={pageHeaderStyles} ref={ref} {...rest} />
})
