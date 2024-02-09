import React, { FC } from 'react';

import { InputField } from './types';
import styles from './input-field.module.scss';

export const InputField: FC<InputField> = ({ value, handleChange, name, placeholder, required, ...props }) => {
  return (
    <input
      {...props}
      className={styles.input}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      required={required}
    />
  );
};