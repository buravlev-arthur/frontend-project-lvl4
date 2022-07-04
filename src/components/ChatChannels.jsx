import React from 'react';
import { Button, Nav, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

const ChatChannels = () => {
  const handleClick = (channel) => (e) => {
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
        <Nav.Item>
          <Button variant="light" className="w-100 text-start" onClick={handleClick('general')}><span>#</span> general</Button>
        </Nav.Item>

        <Nav.Item>
          <Button variant="light" className="w-100 text-start" onClick={handleClick('random')}><span>#</span> random</Button>
        </Nav.Item>

        <Nav.Item>
          <Dropdown as={ButtonGroup} className="w-100">
            <Button variant="light" className="text-start" onClick={handleClick('test')}><span>#</span> test</Button>
            <Dropdown.Toggle split className="flex-grow-0 btn btn-light text-end" />
            <Dropdown.Menu>
              <Dropdown.Item>Удалить</Dropdown.Item>
              <Dropdown.Item>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default ChatChannels;