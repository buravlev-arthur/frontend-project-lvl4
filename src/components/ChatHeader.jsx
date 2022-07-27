import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../store/channelsSlice';
import { selectors as messagesSelectors } from '../store/messagesSlice';

export default function ChatHeader() {
  const { currentChannelName, messagesCount } = useSelector((state) => {
    const { currentChannelId } = state.channels;
    const currentChannelName = channelsSelectors.selectById(state, currentChannelId)?.name;
    const messagesCount = messagesSelectors.selectAll(state)
      .filter(({ channelId }) => channelId === currentChannelId).length;
    return { currentChannelName, messagesCount };
  });

  const { t } = useTranslation();

  return (
    <>
      <div className="fw-bold">
        <small>
          #
          {' '}
          {currentChannelName}
        </small>
      </div>
      <div className="text-muted">
        <small>{t('chat.header.count', { count: messagesCount })}</small>
      </div>
    </>
  );
}
