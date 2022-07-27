import React from 'react';
import filter from 'leo-profanity';
import { setI18n } from './i18n';
import initSocket from './socket';
import routes from './routes';
import App from './components/App';

const init = () => {
  setI18n();
  const actions = initSocket();
  const { pages } = routes;

  filter.loadDictionary('ru');

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    environment: 'production',
  };

  return <App config={{ actions, pages, rollbarConfig }} />;
};

export default init;
