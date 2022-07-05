import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../store/messagesSlice';

const ChatBody = () => {
  const messages = useSelector(selectors.selectAll);

  return (
    <>
      {messages.length ? (
        messages.map((message) => <div><b>admin</b>: <span>text message</span></div>)
      ) : (
        <div className="text-black-50 position-absolute top-50 start-50">
          <small>В этом канале ещё нет сообщений</small>
        </div>
      )}
    </>
  );
};

export default ChatBody;