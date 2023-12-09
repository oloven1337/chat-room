'use client'
import React, { memo, useEffect } from 'react';
import { socket } from '@/services/socketManager';

const Chat = memo((props) => {
  const searchParams = props.searchParams;

  useEffect(() => {
    socket.emit('join', searchParams);
  }, []);

  return (
    <div>
      room
    </div>
  );
});

export default Chat;
