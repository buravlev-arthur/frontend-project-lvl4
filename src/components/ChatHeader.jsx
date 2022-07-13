import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../store/channelsSlice';
import { selectors as messagesSelectors } from '../store/messagesSlice';

const ChatHeader = () => {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));
  const messages = useSelector(messagesSelectors.selectAll);
  const messagesCount = messages.filter(({ channelId }) => channelId === currentChannelId);
  const { t } = useTranslation();

  return (
    <>
      <div className="fw-bold">
        <small># {currentChannel?.name}</small>
      </div>
      <div className="text-muted">
        <small>{t('chat.header.count', { count: messagesCount.length })}</small>
      </div>
    </>
  );
};

export default ChatHeader;