import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../store/channelsSlice';
import { selectors as messagesSelectors } from '../store/messagesSlice';

const chatData = createSelector((state) => state, (allState) => {
  const { currentChannelId } = allState.channels;
  const currentChannelName = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId))?.name;
  const messagesCount = useSelector(messagesSelectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId).length;

  return { currentChannelName, messagesCount };
});

export default function ChatHeader() {
  const { currentChannelName, messagesCount } = useSelector(chatData);
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
