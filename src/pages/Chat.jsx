import React, {
  useEffect,
  useContext,
  useState,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import AuthContext from '../contexts/AuthContext';
import ChatChannels from '../components/ChatChannels';
import ChatHeader from '../components/ChatHeader';
import ChatMessageForm from '../components/ChatMessageForm';
import ChatBody from '../components/ChatBody';
import routes from '../routes';
import { addChannels, setCurrentChannelId } from '../store/channelsSlice';
import { addMessages } from '../store/messagesSlice';

export default function Chat() {
  const [loaded, setLoaded] = useState(false);
  const messagesBoxEl = useRef();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const { t } = useTranslation();

  const scrollDown = () => {
    messagesBoxEl.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };

  useEffect(() => {
    if (!auth.userIsLogged()) {
      const { pages: { login } } = routes;
      navigate(login);
      return;
    }

    axios.get(routes.data, { headers: auth.getAuthHeader() })
      .then(({ data }) => {
        dispatch(addChannels(data.channels));
        dispatch(setCurrentChannelId(data.currentChannelId));
        dispatch(addMessages(data.messages));
        setLoaded(true);
      })
      .catch((error) => {
        toast.error(t('notification.loadingError'));
        rollbar.error(t('notification.loadingError'), error);
      });
  }, []);

  return (
    <Row className="justify-content-lg-center h-75">
      {loaded ? (
        <Col lg={8} className="rounded shadow h-100">
          <Row className="rounded h-100">
            <Col lg={2} className="bg-light rounded-start border-end h-100 overflow-auto">
              <ChatChannels />
            </Col>

            <Col lg={10} className="d-flex flex-column h-100 bg-white rounded-end">
              <Row className="rounded-top">
                <Col className="shadow-sm py-3 bg-light rounded-top">
                  <ChatHeader />
                </Col>
              </Row>

              <Row className="overflow-auto my-3 flex-grow-1">
                <Col id="messages-box" className="chat-messages px-4" ref={messagesBoxEl}>
                  <ChatBody scrollDown={scrollDown} />
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
      ) : (
        <div className="d-flex align-items-center justify-content-center h-100">
          <Spinner animation="grow" />
        </div>
      )}
    </Row>
  );
}
