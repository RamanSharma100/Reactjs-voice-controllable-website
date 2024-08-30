import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';

const Search = ({ setStopReco }) => {
  const [searchText, setSearchText] = useState('');
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [typing, setTyping] = useState(false);

  const location = useLocation();
  const { speak } = useSpeechSynthesis();

  const searchVideos = (string) => {
    setTyping(false);
    axios
      .get(import.meta.env.VITE_APP_Youtube_API, {
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 25,
          q: string.trim(),
          key: import.meta.env.VITE_APP_Youtube_API_Key,
        },
      })
      .then(async (res) => {
        setVideos(res.data.items);
        setVideosLoading(false);
        await speak({ text: 'Videos Search Complete. Here are the results' });
      })
      .catch(async (err) => {
        console.log(err.message);
        await speak({
          text: 'Something Went Wrong Please check your internet connection and console for the error',
        });
        setVideosLoading(false);
      });
  };

  useEffect(() => {
    if (location.state.text) {
      setVideosLoading(true);
      setVideos([]);
      setSearchText(location.state.text);
      searchVideos(location.state.text);
    } else {
      setVideosLoading(true);
      setVideos([]);
      setSearchText('');
    }
  }, [location]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 pt-4 mx-auto">
          {searchText && !typing ? (
            videosLoading ? (
              <h1 className="text-center">Searching {searchText}</h1>
            ) : (
              <>
                <h1 className="text-center mt-3 mb-5">
                  Results for {searchText} from youtube
                </h1>
                {videos.map((vid, index) => (
                  <div className="card mb-3" key={index * 45312 + 4532}>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img
                          src={vid.snippet.thumbnails.medium.url}
                          className="card-img"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{vid.snippet.title}</h5>
                          <p className="card-text">{vid.snippet.description}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {vid.snippet.channelTitle}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )
          ) : (
            <>
              <h1 className="text-center display-3 px-5 mb-4  font-weight-bold">
                What Do You Want To Search?
              </h1>
              <form
                className="form-group mt-5 border-bottom "
                onSubmit={() => searchVideos(searchText)}>
                <input
                  type="search"
                  className="form-control border-0 shadow-none"
                  placeholder="Search Here"
                  onChange={(e) => {
                    setTyping(true);
                    setSearchText(e.target.value);
                  }}
                  value={searchText}
                />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
