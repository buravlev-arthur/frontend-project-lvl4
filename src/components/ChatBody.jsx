import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../store/messagesSlice';

const ChatBody = () => {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const messages = useSelector(messagesSelectors.selectAll);
  const filtredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <>
      {filtredMessages.length ? (
        filtredMessages.map(({ id, username, body }) => (
          <div key={id}><b>{username}</b>: <span>{ body }</span></div>
        ))
      ) : (
        <div className="text-black-50 position-absolute top-50 start-50">
          <small>В этом канале ещё нет сообщений</small>
        </div>
      )}
    </>
  );
};

export default ChatBody;