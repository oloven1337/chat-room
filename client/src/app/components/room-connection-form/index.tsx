'use client'

import React, { ChangeEvent, MouseEvent, useState } from 'react';
import Link from 'next/link';

import { InputField } from '@/app/components/input-field'

import styles from './room-connection-form.module.scss';

const FIELDS = {
  NAME: 'name',
  ROOM: 'room',
};

export const RoomConnectionForm = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: '', [ROOM]: ''} );

  const handleChange = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const isDisabled = Object.values(values).some(value => !value);

    if (isDisabled) event.preventDefault();
  }

  return (
    <>
      <h1 className={styles.heading}>Join</h1>
      <form className={styles.form}>
        <div className={styles.group}>
          <InputField
            type="text"
            value={values[NAME]}
            name="name"
            placeholder="Username"
            handleChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <InputField
            type="text"
            value={values[ROOM]}
            name="room"
            placeholder="Room"
            handleChange={handleChange}
            required
          />
        </div>
        <Link onClick={handleClick} href={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
          <button className={styles.buttonJoin}>
            Sign in
          </button>
        </Link>
      </form>
    </>
  );
};