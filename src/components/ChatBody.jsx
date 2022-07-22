import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as messagesSelectors } from '../store/messagesSlice';

export default function ChatBody({ scrollDown }) {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const messages = useSelector(messagesSelectors.selectAll);
  const filtredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const { t } = useTranslation();

  useEffect(() => {
    scrollDown();
  });

  return (
    <div>
      {filtredMessages.length ? (
        filtredMessages.map(({ id, username, body }) => (
          <div key={id}>
            <b>{username}</b>
            :
            {' '}
            <span>{ body }</span>
          </div>
        ))
      ) : (
        <div className="text-black-50 d-flex justify-content-center mt-5">
          <small>{t('chat.noMessages')}</small>
        </div>
      )}
    </div>
  );
}
