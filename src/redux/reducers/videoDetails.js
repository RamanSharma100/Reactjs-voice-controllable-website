import {
  SET_VIDEO_DETAIL,
  SET_VIDEO_DETAIL_LOADING,
} from "../actions/videoDetailAction";

const initialState = {
  videoDetailLoading: true,
  video: null,
};

const videoDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_DETAIL:
      state = {
        ...state,
        video: action.payload,
      };
      return state;
    case SET_VIDEO_DETAIL_LOADING:
      state = { ...state, videoDetailLoading: action.payload };
      return state;
    default:
      return state;
  }
};

export default videoDetailReducer;
