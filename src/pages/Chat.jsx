import React, { useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import ChatChannels from '../components/ChatChannels';
import ChatHeader from '../components/ChatHeader';
import ChatMessageForm from '../components/ChatMessageForm';
import ChatBody from '../components/ChatBody';

const Chat = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.userIsLogged()) {
      navigate('/login');
    };
  });

  return (
    <Row className="justify-content-lg-center h-75">
      <Col lg={8} className="rounded shadow h-100">
        <Row className="rounded h-100">
          <Col lg={2} className="bg-light rounded-start border-end">
            <ChatChannels />
          </Col>

          <Col lg={10} className="d-flex flex-column h-100 bg-white rounded-end">
            <Row className="rounded-top">
              <Col className="shadow-sm py-3 bg-light rounded-top">
                <ChatHeader />
              </Col>
            </Row>

            <Row className="overflow-auto my-3">
              <Col id="messages-box" className="chat-messages px-4">
                <ChatBody />
              </Col>
            </Row>

            <Row className="my-3">
              <Col>
                <ChatMessageForm />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Chat;