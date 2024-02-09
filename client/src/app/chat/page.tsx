'use client'
import React, { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { io } from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import { useRouter } from 'next/navigation'

import { InputField } from '@/app/components/input-field';
import { Messages } from '@/app/components/messages';

import unicorn from '../../images/unicorn.png';
import styles from './chat.module.css';

const Chat = memo((props) => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState('');
  const [isOpenEmojis, setOpenEmojis] = useState(false);
  const searchParams: {
    room: string;
    name: string;
  } = props.searchParams;

  const socket = io('http://localhost:4000');

  const handleMessage = ({ data }) => {
    setMessages((_state) => ([..._state, data]));
  };

  const leftRoom = () => {
    socket.emit('leftRoom', {
      params: searchParams
    })

    router.push('/');
  };

  const handleChange = ({ target: { value } }) => {
    setMessageValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!messageValue) return;

    socket.emit('sendMessage', { messageValue, params: searchParams });

    setMessageValue('');
  };

  const onEmojiClick = ({ emoji }) => setMessageValue(`${messageValue} ${emoji}`);

  useEffect(() => {
    socket.emit('join', searchParams);
  }, []);

  useEffect(() => {
    socket.on('message', handleMessage);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}></div>
      <div className={styles.title}>{searchParams.room}</div>
      <button className={styles.left} onClick={leftRoom}>
        Left the room
      </button>
      <div className={styles.messages}>
        <Messages messages={messages} name={searchParams.name} />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <InputField
            type="text"
            name="message"
            placeholder="What do you want to write?"
            value={messageValue}
            handleChange={handleChange}
            required
          />
        </div>
        <div className={styles.emoji}>
          <Image width={40} height={40} src={unicorn} alt="" onClick={() => setOpenEmojis(!isOpenEmojis)} />
          {isOpenEmojis && (
            <div className={styles.emojis}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className={styles.button}>
          <input type="submit" onSubmit={handleSubmit} value="Send a message" />
        </div>
      </form>
    </div>
  );
});

export default Chat;
