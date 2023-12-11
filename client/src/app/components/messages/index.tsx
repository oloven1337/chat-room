import React from 'react';

import { trimStr } from '@/utils'

import styles from './messages.module.css';

export const Messages = ({ messages, name }) => {

  return (
    <div className={styles.messages}>
      {messages.map(( { user, message }, idx ) => {
        const itsMe = trimStr(user.name) === trimStr(name);
        const className = itsMe ? styles.me : styles.user;

        return (
          <div key={idx} className={`${styles.message} ${className}`}>
            <span className={styles.user}>
              {user.name}
            </span>
            <div className={styles.text}>
              {message}
            </div>
          </div>
        )
      })}
    </div>
  );
};
