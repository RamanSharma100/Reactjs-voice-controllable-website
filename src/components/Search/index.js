import React, { useEffect } from "react";
import { speak } from "../../api/voiceRecognition";

const Search = ({ setStopReco, setGreet }) => {
  useEffect(() => {
    setStopReco(true);
    setGreet(true);
    speak(
      "This is a search page. You can search here anything by typing, or by voice",
      true,
      true,
      setGreet,
      setStopReco
    );
  }, []);
  return <div>Search</div>;
};

export default Search;
