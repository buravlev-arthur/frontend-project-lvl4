import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../store/channelsSlice';
import { selectors as messagesSelectors } from '../store/messagesSlice';

const ChatHeader = () => {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));
  const messages = useSelector(messagesSelectors.selectAll);
  const messagesCount = messages.filter(({ channelId }) => channelId === currentChannelId);
  return (
    <>
      <div className="fw-bold">
        <small># {currentChannel?.name}</small>
      </div>
      <div className="text-muted">
        <small>{messagesCount.length} сообщений</small>
      </div>
    </>
  );
};

export default ChatHeader;