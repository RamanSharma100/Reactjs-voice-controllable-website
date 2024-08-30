import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.scss';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import videosReducer from './redux/reducers/videosReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import videoDetailReducer from './redux/reducers/videoDetails';

import 'react-toastify/dist/ReactToastify.css';

const reducers = combineReducers({
  videos: videosReducer,
  videoDetail: videoDetailReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
