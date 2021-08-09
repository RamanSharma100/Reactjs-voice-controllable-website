import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { recognition, speak } from "./api/voiceRecognition";
import { addVideos } from "./redux/actionCreators/videosActionCreator";

import "./App.scss";

import Home from "./components/Home";
import InstructionScreen from "./components/InstructionScreen";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CurrentVideo from "./components/CurrentVideo";
import OpenVideoHome from "./components/OpenVideo/OpenVideoHome";
import Videos from "./components/Videos";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [greet, setGreet] = useState(false);
  const [stopReco, setStopReco] = useState(true);
  const [instructionsScreen, setInstructionScreen] = useState(true);
  const [openVideoHome, setOpenVideoHome] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(12);
  const [countPages, setCountPages] = useState(1);

  const history = useHistory();
  const { videosLoading, videos, popularVideos } = useSelector(
    (state) => ({
      videosLoading: state.videos.videosLoading,
      videos: state.videos.videos,
      popularVideos: state.videos.popularVideos,
    }),
    shallowEqual
  );
  let pages = Math.ceil(videos?.length / 12);

  const dispatch = useDispatch();

  const Greet = async () => {
    await speak(
      "Welcome to the Voice controllable website. Please chekout the commands!. These commands will help you to controll website with voice!. Click on the Next button to start!.",
      stopReco,
      greet,
      setGreet,
      setStopReco
    );
  };

  const prevPage = () => {
    setStart((prevStart) => prevStart - 12);
    setEnd((prevEnd) => prevEnd - 12);
    setCountPages((prevCountPage) => prevCountPage - 1);
  };
  const nextPage = () => {
    setStart((prevStart) => prevStart + 12);
    setEnd((prevEnd) => prevEnd + 12);
    setCountPages((prevCountPage) => prevCountPage + 1);
  };

  useEffect(() => {
    if (!greet) {
      Greet();
    }
    if (videosLoading) {
      dispatch(addVideos());
    }
  }, [greet, dispatch]);

  // recognition properties and commands

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;

    // navigation

    if (
      command.startsWith("navigate") ||
      (command.startsWith("go to") && !command.includes("search"))
    ) {
      let pageName;
      if (command.endsWith("page") || command.endsWith("route")) {
        pageName = !command.includes("homepage")
          ? command.split(" ")[command.split(" ").length - 2]
          : "home";
      } else {
        pageName = !command.includes("homepage")
          ? command.split(" ")[command.split(" ").length - 1]
          : "home";
      }
      if (pageName === "index" || pageName === "home") {
        history.push(`/`);
      } else {
        pageName = command.includes("about us")
          ? "about"
          : command.includes("contact us")
          ? "contact"
          : pageName;

        history.push(`/${pageName}`);
      }
    }

    // video selection

    if (command.startsWith("open video")) {
      if (window.location.pathname === "/") {
        if (command.includes("from")) {
          const currentCommand = command;
          let videoNo = currentCommand.match(/\d+/);
          if (command.includes("one")) {
            videoNo = "1";
          }
          const Package = command.split("from").reverse()[0];
          if (Package.trim() === "uploads") {
            history.push(
              `/video/${videos.slice(0, 5)[parseInt(videoNo - 1)].id.videoId}`
            );
          } else {
            console.log(currentCommand);
            console.log(popularVideos.slice(0, 5)[parseInt(videoNo - 1)]);
            history.push(
              `/video/${
                popularVideos.slice(0, 5)[parseInt(videoNo - 1)].id.videoId
              }`
            );
          }
        } else {
          const videoNo = command
            .split("video")
            .reverse()[0]
            .split("")
            .reverse()[0];
          if (!openVideoHome) {
            setSelectedVideos([
              {
                from: "uploads",
                url: window.location.pathname,
                video: videos.slice(0, 5)[parseInt(videoNo) - 1],
              },
              {
                from: "popular uploads",
                url: window.location.pathname,
                video: popularVideos.slice(0, 5)[parseInt(videoNo) - 1],
              },
            ]);
            setOpenVideoHome(true);
          } else {
            if (parseInt(videoNo) < 6 && parseInt(videoNo) > 0) {
              history.push(
                `/video/${
                  selectedVideos[parseInt(videoNo - 1)].video.id.videoId
                }`
              );
            }
            setSelectedVideos(false);
            setOpenVideoHome(false);
          }
        }
      }
      if (window.location.pathname === "/videos") {
        const videoNo = command
          .split("video")
          .reverse()[0]
          .split("")
          .reverse()[0];

        if (parseInt(videoNo) < 13 && parseInt(videoNo) > 0) {
          history.push(
            `/video/${
              videos.slice(start, end)[parseInt(videoNo - 1)].id.videoId
            }`
          );
        }
        setSelectedVideos(false);
        setOpenVideoHome(false);
      }
    }

    // go back command
    if (
      command === "go back" ||
      command === "go to previous page" ||
      command === "go to prev page" ||
      command === "go backward"
    ) {
      history.goBack();
    }
    // go next command
    if (
      command === "go next" ||
      command === "go to next page" ||
      command === "go forward"
    ) {
      history.goForward();
    }

    // next page videos
    if (
      (command === "next page" || command === "next") &&
      window.location.pathname === "/videos"
    ) {
      console.log(pages);
      if (countPages !== pages) {
        nextPage();
      }
    }
    // prev page videos

    if (
      (command === "prev page" ||
        command === "previous page" ||
        command === "prev" ||
        command === "previous") &&
      window.location.pathname === "/videos"
    ) {
      if (start > 0) {
        prevPage();
      }
    }
  };

  recognition.onend = () => {
    recognition.start();
  };

  return (
    <div className="App">
      <ToastContainer />
      {instructionsScreen && (
        <InstructionScreen
          setInstructionScreen={setInstructionScreen}
          setStopReco={setStopReco}
        />
      )}
      {openVideoHome && (
        <OpenVideoHome
          setOpenVideoHome={setOpenVideoHome}
          selectedVideos={selectedVideos}
        />
      )}
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/video/:id">
          <CurrentVideo />
        </Route>
        <Route
          path="/videos"
          component={() => (
            <Videos
              start={start}
              end={end}
              nextPage={nextPage}
              prevPage={prevPage}
              countPages={countPages}
            />
          )}
        />
        <Route path="/search">
          <Search setStopReco={setStopReco} setGreet={setGreet} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
