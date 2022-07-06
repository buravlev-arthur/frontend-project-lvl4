import { Button, Nav, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, setCurrentChannelId } from '../store/channelsSlice';

const ChatChannels = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const dispatch = useDispatch();

  const select = (channelId) => () => {
    dispatch(setCurrentChannelId(channelId));
  };

  const remove = (channel) => (e) => {
    console.log(channel);
  };
  const rename = (channel) => (e) => {
    console.log(channel);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 mt-5">
        <div className="align-self-center">Каналы</div>
        <div className="align-self-center">
          <Button variant="link text-dark p-0">
            <PlusCircle />
          </Button>
        </div>
      </div>

      <Nav fill variant="pills" className="d-flex flex-column">
        {channels.map(({ id, name, removable }) => {
          const buttonStyle = id === currentChannelId ? 'secondary' : 'light';

          if (!removable) {
            return (
              <Nav.Item key={id}>
                <Button variant={buttonStyle} className="w-100 text-start" onClick={select(id)}>
                  <span>#</span> {name}
                </Button>
              </Nav.Item>
            );
          }

          return (
            <Nav.Item key={id}>
              <Dropdown as={ButtonGroup} className="w-100">
                <Button variant={buttonStyle} className="text-start" onClick={select(id)}>
                  <span>#</span> {name}
                </Button>
                <Dropdown.Toggle split variant={buttonStyle} className="flex-grow-0 text-end" />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={remove(id)}>Удалить</Dropdown.Item>
                  <Dropdown.Item onClick={rename(id)}>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
};

export default ChatChannels;