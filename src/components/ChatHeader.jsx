import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../store/channelsSlice';
import { selectors as messagesSelectors } from '../store/messagesSlice';

const ChatHeader = () => {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));
  const messagesCount = useSelector(messagesSelectors.selectTotal);
  return (
    <>
      <div className="fw-bold">
        <small># {currentChannel?.name}</small>
      </div>
      <div className="text-muted">
        <small>{messagesCount} сообщений</small>
      </div>
    </>
  );
};

export default ChatHeader;