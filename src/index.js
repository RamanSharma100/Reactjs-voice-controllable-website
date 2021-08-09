import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import videosReducer from "./redux/reducers/videosReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import videoDetailReducer from "./redux/reducers/videoDetails";

import "react-toastify/dist/ReactToastify.css";

const reducers = combineReducers({
  videos: videosReducer,
  videoDetail: videoDetailReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
