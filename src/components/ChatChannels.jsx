import { useImmer } from 'use-immer';
import { Button, Nav, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, setCurrentChannelId } from '../store/channelsSlice';
import ModalWindow from './ModalWindow';

const ChatChannels = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const dispatch = useDispatch();

  const [modalSettings, updateModalSettings] = useImmer({
    type: 'add',
    show: false,
    channelId: null,
    channelName: '',
  });

  const openModal = (type, channelId = null, channelName = '') => () => {
    updateModalSettings((draft) => {
      draft.type = type;
      draft.show = true;
      draft.channelId = channelId;
      draft.channelName = channelName;
    });
  };

  const closeModal = () => updateModalSettings((draft) => {draft.show = false});

  const select = (channelId) => () => {
    dispatch(setCurrentChannelId(channelId));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 mt-5">
        <div className="align-self-center">Каналы</div>
        <div className="align-self-center">
          <Button variant="link text-dark p-0" onClick={openModal('add')}>
            <PlusCircle />
          </Button>
        </div>
      </div>

      <Nav fill variant="pills" className="d-flex flex-column">
        {channels.map(({ id, name, removable }) => {
          const buttonStyle = id === currentChannelId ? 'secondary' : 'light';

          return removable ? (
            <Nav.Item key={id} className="w-100">
              <Dropdown as={ButtonGroup} className="w-100">
                <Button variant={buttonStyle} className="text-start w-100 text-truncate" onClick={select(id)}>
                  <span>#</span> {name}
                </Button>
                <Dropdown.Toggle split variant={buttonStyle} className="flex-grow-0 text-end" />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={openModal('remove', id, name)}>Удалить</Dropdown.Item>
                  <Dropdown.Item onClick={openModal('rename', id, name)}>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          ) : (
            <Nav.Item key={id}>
              <Button variant={buttonStyle} className="w-100 text-start text-truncate" onClick={select(id)}>
                <span>#</span> {name}
              </Button>
            </Nav.Item>         
          )
        })}
      </Nav>

      <ModalWindow close={closeModal} {...modalSettings} />
    </>
  );
};

export default ChatChannels;