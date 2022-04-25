import React from 'react';
import styles from './dropdown-label.module.css';
import { forwardRef } from '../../../utils';
import cn from 'clsx';

interface DropdownLabelProps {}

export const DropdownLabel = forwardRef<DropdownLabelProps, 'label'>(
  (props, ref) => {
    return (
      <label
        id='dropdown-label'
        className={cn(styles.dropdown_label, props.className)}
        ref={ref}
        {...props}
      />
    );
  }
);
