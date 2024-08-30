import axios from 'axios';

const setVideoDetailLoading = (data) => ({
  type: 'SET_VIDEO_DETAIL_LOADING',
  payload: data,
});
const setVideoDetail = (data) => ({
  type: 'SET_VIDEO_DETAIL',
  payload: data,
});

export const addVideoDetail = (id) => (dispatch) => {
  dispatch(setVideoDetailLoading(true));
  axios
    .get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,statistics',
        id,
        key: import.meta.env.VITE_APP_Youtube_API_Key,
      },
    })
    .then((res) => {
      dispatch(setVideoDetail(res.data));
      dispatch(setVideoDetailLoading(false));
    })
    .catch((err) => console.log(err.message));
};
