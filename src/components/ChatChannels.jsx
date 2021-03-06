import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, setCurrentChannelId } from '../store/channelsSlice';
import { openModalWindow } from '../store/modalSlice';

export default function ChatChannels() {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openModal = (type, channelId = null, channelName = '') => () => {
    dispatch(openModalWindow({
      show: true,
      type,
      channelId,
      channelName,
    }));
  };

  const select = (channelId) => () => {
    dispatch(setCurrentChannelId(channelId));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 mt-5">
        <div className="align-self-center">{t('chat.channels.header')}</div>
        <div className="align-self-center">
          <Button variant="link text-dark p-0" onClick={openModal('add')}>
            <PlusCircle />
            <span className="visually-hidden">{t('chat.channels.addButton')}</span>
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
                  <span>#</span>
                  {' '}
                  {name}
                </Button>
                <Dropdown.Toggle split variant={buttonStyle} className="flex-grow-0 text-end">
                  <span className="visually-hidden">{t('chat.channels.toggleButton')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={openModal('remove', id, name)}>{t('chat.channels.removeButton')}</Dropdown.Item>
                  <Dropdown.Item onClick={openModal('rename', id, name)}>{t('chat.channels.renameButton')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          ) : (
            <Nav.Item key={id}>
              <Button variant={buttonStyle} className="w-100 text-start text-truncate" onClick={select(id)}>
                <span>#</span>
                {' '}
                {name}
              </Button>
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
}
