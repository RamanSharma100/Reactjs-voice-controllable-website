import {
  SET_POPULAR_VIDEOS,
  SET_VIDEOS,
  SET_VIDEOS_LOADING,
} from "../actions/videosAction";

const initialState = {
  videosLoading: true,
  videos: [],
  popularVideos: [],
  nextPageToken: null,
  prevPageToken: null,
  pageInfo: null,
};

const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOS:
      state = {
        ...state,
        videos: action.payload.items,
        nextPageToken: action.payload.nextPageToken,
        pageInfo: action.payload.pageInfo,
      };
      return state;
    case SET_VIDEOS_LOADING:
      state = { ...state, videosLoading: action.payload };
      return state;
    case SET_POPULAR_VIDEOS:
      state = { ...state, popularVideos: action.payload.items };
      return state;
    default:
      return state;
  }
};

export default videosReducer;
