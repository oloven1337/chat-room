import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const handleMessage = ({ data }) => {
  console.log(data);
};

socket.on('message', handleMessage);

export { socket, handleMessage };
