import { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { recognition } from "./api/voiceRecognition";
import { addVideos } from "./redux/actionCreators/videosActionCreator";
import { toast, ToastContainer } from "react-toastify";
import { useSpeechSynthesis } from "react-speech-kit";
import { routes } from "./constants";

import "./App.scss";

import Home from "./components/Home";
import InstructionScreen from "./components/InstructionScreen";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CurrentVideo from "./components/CurrentVideo";
import OpenVideoHome from "./components/OpenVideo/OpenVideoHome";
import Videos from "./components/Videos";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Page404 from "./components/Page404";

const App = () => {
  const [greet, setGreet] = useState(false);
  const [stopReco, setStopReco] = useState(true);
  const [instructionsScreen, setInstructionScreen] = useState(true);
  const [openVideoHome, setOpenVideoHome] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(12);
  const [countPages, setCountPages] = useState(1);
  const [videoRef, setVideoRef] = useState();

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const submitRef = useRef();

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const { speak } = useSpeechSynthesis();

  const submitForm = (e) => {
    e.preventDefault();

    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !messageRef.current.value
    ) {
      toast.dark("Please fill all fields!");
      speak({ text: "Please fill all fields!" });
      return;
    }

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    console.log(data);
    speak({ text: "Form submitted!" });
    speak({ text: "Thank you for your message!" });
  };

  // const scrollLocation = window.pageYOffset;
  const maxScroll =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

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

  const Greet = () => {
    speak({
      text: "Welcome to the Voice controllable website. Please chekout the commands!. These commands will help you to controll website with voice!. Click on the Next button to start!.",
    });
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
    if (videosLoading) {
      dispatch(addVideos());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!greet) {
      Greet();
      setGreet(true);
    }
  }, [greet]);

  // recognition properties and commands

  recognition.onresult = async (event) => {
    let command = event.results[0][0].transcript.toLowerCase();
    command = command.replace(".", "");
    console.log(command);

    // navigation

    if (
      command.startsWith("navigate") ||
      (command.startsWith("navigate to") && !command.includes("search"))
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

        if (pageName === "search") {
          history.push({ pathname: `/${pageName}`, state: { text: "" } });
        } else {
          history.push(`/${pageName}`);
        }
      }
      if (routes.includes(pageName.toLowerCase())) {
        await speak({ text: `Navigated to ${pageName} page` });
      } else if (pageName.toLowerCase() === "search") {
        await speak({
          text: "What do you want to search for? Say something like 'search for', followed by the keyword you want to search for,  or,  type it in the search bar ",
        });
      } else {
        await speak({
          text: "This Page is not available. Please say 'go back', to go back",
        });
      }
      return;
    }

    // video selection

    if (
      command.startsWith("open video") ||
      command.startsWith("open video #")
    ) {
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/videos"
      ) {
        if (
          command.replace("open video", "").trim() === "" ||
          command.replace("open video number", "").trim() === "" ||
          command.replace("open video #", "").trim() === ""
        ) {
          return await speak({
            text: "Please mention the video number also, or, video number with category",
          });
        }
      }
      if (window.location.pathname === "/") {
        if (
          command.replace("open video number", "").trim() !== "one" &&
          (parseInt(
            command.toLowerCase().replace("open video number", "").trim()
          ) < 1 ||
            parseInt(
              command.toLowerCase().replace("open video number", "").trim()
            ) > 5 ||
            parseInt(
              command.toLowerCase().replace("open video #", "").trim()
            ) === 0 ||
            parseInt(command.toLowerCase().replace("open video #", "").trim()) >
              5)
        ) {
          await speak({
            text: "This Video number is not avaliable. please select videos with number in the view range , that range is from, 1 to 5 , with in each category",
          });
          return;
        }

        if (command.includes("from")) {
          const currentCommand = command;
          let videoNo = currentCommand.match(/\d+/);

          if (command.includes("one")) {
            videoNo = "1";
          }

          if (videoNo !== null) {
            const Package = command.split("from").reverse()[0];
            if (Package.trim() === "uploads") {
              await speak({
                text: `opening video `,
              });
              history.push(
                `/video/${videos.slice(0, 5)[parseInt(videoNo - 1)].id.videoId}`
              );
            } else {
              await speak({
                text: `opening video `,
              });
              history.push(
                `/video/${
                  popularVideos.slice(0, 5)[parseInt(videoNo - 1)].id.videoId
                }`
              );
            }
          } else {
            await speak({
              text: "Please say the video number , for example, video number 1 , or, video number with category, for example, video number 1 from popular videos, or, video number 1 from uploads",
            });
          }
        } else {
          let videoNo = command
            .split("video")
            .reverse()[0]
            .split("")
            .reverse()[0];

          if (
            parseInt(
              command.toLowerCase().replace("open video #", "").trim()
            ) !== ""
          ) {
            videoNo = parseInt(
              command.toLowerCase().replace("open video #", "").trim()
            );
          }

          if (command.includes("one")) {
            videoNo = "1";
          }
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
            await speak({
              text: "Please select videos from categories given in dialog box",
            });
          } else {
            if (parseInt(videoNo) < 6 && parseInt(videoNo) > 0) {
              await speak({ text: "opening video" });
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
        let videoNo = command
          .split("video")
          .reverse()[0]
          .split(" ")
          .reverse()[0];

        if (videoNo.includes("#")) {
          videoNo = videoNo.split("#")[0];
        }

        if (command.includes("one")) {
          videoNo = "1";
        }

        if (
          parseInt(videoNo) < end - start + 1 &&
          parseInt(videoNo) > start - start
        ) {
          let replacedString;
          const videoTitle = videos.slice(start, end)[parseInt(videoNo - 1)]
            .snippet.title;

          if (videoTitle.startsWith("#")) {
            let replacedString = videos
              .slice(start, end)
              [parseInt(videoNo - 1)].snippet.title.replace("#", "");

            await speak({
              text: `opening video ${replacedString.substring(
                1,
                replacedString.length
              )}`,
            });
          } else {
            await speak({
              text: `opening video ${videoTitle}`,
            });
          }
          history.push(
            `/video/${
              videos.slice(start, end)[parseInt(videoNo - 1)].id.videoId
            }`
          );
          return;
        } else {
          await speak({
            text: `This video number is not avaliable. please select videos with number in the view range , that range is from, ${
              start + 1
            } to ${end}, or say next or previous to paginate`,
          });
          setSelectedVideos(false);
          setOpenVideoHome(false);
        }
      }
    }

    // control videos
    if (window.location.pathname.includes("/video/")) {
      if (
        command.includes("start") ||
        command.includes("play") ||
        command.includes("start video") ||
        command.includes("play video")
      ) {
        speak({ text: "Playing video" });
        videoRef.playVideo();
      }
      if (
        command.includes("stop") ||
        command.includes("pause") ||
        command.includes("stop video") ||
        command.includes("pause video")
      ) {
        speak({ text: "Pausing video" });
        videoRef.pauseVideo();
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
      await speak({ text: "Going back" });
    }
    // go next command
    if (
      command === "go next" ||
      command === "go to next page" ||
      command === "go forward"
    ) {
      history.goForward();
      await speak({ text: "Going forward" });
    }

    // next page videos
    if (
      (command === "next page" || command === "next") &&
      window.location.pathname === "/videos"
    ) {
      if (countPages !== pages) {
        nextPage();
        await speak({ text: "Showing next page of videos" });
        await speak({ text: `Showing Page ${countPages + 1} of ${pages}` });
      } else {
        await speak({ text: "This is the last page" });
        await speak({ text: ` Total pages are ${pages}` });
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
        await speak({ text: "Showing previous page of videos" });
        await speak({ text: `Showing Page ${countPages + 1} of ${pages}` });
      } else {
        await speak({ text: "This is the first page" });
        await speak({ text: ` Total pages are ${pages}` });
      }
    }

    // stop recogniton and taking commands
    if (command === "stop recognition" || command === "stop taking commands") {
      recognition.stop();
      setStopReco(true);
      toast.dark("Taking commands stopped!");
      await speak({ text: "Stopped taking commands!" });
    }

    // scrolling commands
    if (
      command === "scroll down" ||
      command === "scrolldown" ||
      command === "go down" ||
      command === "godown"
    ) {
      window.scrollBy(0, 100);
      await speak({ text: `Scrolling down by 100px ` });
    } else if (
      command === "scroll up" ||
      command === "scrollup" ||
      command === "go up" ||
      command === "goup"
    ) {
      window.scrollBy(0, -100);
      await speak({ text: `Scrolling up by 100px ` });
    } else if (
      command === "go to top" ||
      command === "go top" ||
      command === "scroll to top" ||
      command === "gotop" ||
      command === "scrolltotop" ||
      command === "gototop"
    ) {
      window.scrollTo(0, 0);
      await speak({ text: `Scrolling to top of the page` });
    } else if (
      command === "go to bottom" ||
      command === "go bottom" ||
      command === "scroll to bottom" ||
      command === "gobottom" ||
      command === "scrolltobottom" ||
      command === "gotobottom"
    ) {
      window.scrollTo(0, maxScroll);
      await speak({ text: `Scrolling to bottom of the page` });
    } else if (
      command === "go to half" ||
      command === "gotohalf" ||
      command === "go to half of the page" ||
      command === "scroll to half"
    ) {
      window.scrollTo(0, document.body.scrollHeight / 2);
      await speak({ text: `Scrolling to half of the page` });
    } else if (
      command.includes("scroll to") ||
      command.includes("move to") ||
      command.includes("scroll by") ||
      command.includes("move by") ||
      command.includes("scroll") ||
      command.includes("move")
    ) {
      let pert;
      if (
        command.includes("percentage") ||
        command.includes("percent") ||
        command.includes("%")
      ) {
        if (command.includes("percentage")) {
          pert = command.split("percentage");
        }
        if (command.includes("%")) {
          pert = command.split("%");
        }
        if (command.includes("percent")) {
          pert = command.split("percent");
        }
        const number = pert[0].trim().split(" ").reverse()[0];
        if (
          number !== "undefined" &&
          number !== null &&
          !/^[a-zA-Z].*/.test(number)
        ) {
          window.scrollTo(0, (parseInt(number) / 100) * maxScroll);
          await speak({ text: `Scrolling to ${number}% of the page` });
        }
      }
      if (
        command.includes("pixel") ||
        command.includes("pixels") ||
        command.includes("px")
      ) {
        if (command.includes("pixels")) {
          pert = command.split("pixels");
        }
        if (command.includes("pixel")) {
          pert = command.split("pixel");
        }
        if (command.includes("px")) {
          pert = command.split("px");
        }
        const number = pert[0].trim().split(" ").reverse()[0];
        if (
          number !== "undefined" &&
          number !== null &&
          !/^[a-zA-Z].*/.test(number)
        ) {
          if (command.includes("up") || command.includes("down")) {
            if (pert[1].trim() === "up") {
              window.scrollBy(0, -parseInt(number));
              await speak({ text: `Scrolling up by ${number}px` });
            }
            if (pert[1].trim() === "down") {
              window.scrollBy(0, parseInt(number));
              await speak({ text: `Scrolling down by ${number}px` });
            }
          } else {
            window.scrollTo(0, parseInt(number));
            await speak({ text: `Scrolling to ${number}px` });
          }
        }
      }
    }

    // open commands table
    if (command === "open commands table" || command === "open command table") {
      // if (stopReco) {
      //   recognition.stop();
      //   toast.dark("Stopped Taking commands!");
      // }
      setStopReco(false);
      setInstructionScreen(true);
      await speak({ text: "Opened Command Table" });
      await speak({
        text: "Click on next or close button to start taking commands again!",
      });
      toast.dark(
        "Click on next or close button to start taking commands again!"
      );
    }
    // close commands table
    if (
      command === "close commands table" ||
      command === "close command table"
    ) {
      // if (!stopReco) {
      //   recognition.stop();
      //   recognition.start();
      //   toast.dark("Started Taking commands!");
      // }
      setStopReco(false);
      setInstructionScreen(false);
      await speak({ text: "closed Command Table" });
      toast.dark("Closed Command Table!");
    }

    // fill form
    if (window.location.pathname === "/contact") {
      if (
        command.includes("insert") ||
        command.includes("add") ||
        command.includes("type")
      ) {
        if (command.includes("name")) {
          const name = command.split("name")[1].trim();

          speak({ text: `Filling name field with ${name}` });
          if (!name) {
            toast.dark("No name found!");
            speak({ text: "No name found!" });
            return;
          }

          setNewName(name);
        } else if (command.includes("email")) {
          const email = command.split("email")[1].trim();

          speak({ text: `Filling email field with ${email}` });

          if (!email) {
            toast.dark("No email found!");
            speak({ text: "No email found!" });
            return;
          }

          setNewEmail(email);
        } else if (command.includes("message")) {
          const message = command.split("message")[1].trim();

          speak({ text: `Filling message field with ${message}` });

          if (!message) {
            toast.dark("No message found!");
            speak({ text: "No message found!" });
            return;
          }

          setNewMessage(message);
        }
      } else if (
        command.includes("submit form") ||
        command.includes("submit")
      ) {
        submitRef.current.click();
        setNewMessage("");
        setNewEmail("");
        setNewName("");
      } else {
        speak({
          text: "Please say add, or, insert, or type, followed by , field name, and, your data. and say submit form to submit it or type and submit manually",
        });
      }
    }

    // search commands
    if (command.includes("search video") || command.includes("search")) {
      if (
        command === "open search page" ||
        command === "open search" ||
        command === "search for me" ||
        command === "search" ||
        command === "search video"
      ) {
        history.push({ pathname: "/search", state: { text: "" } });
        await speak({
          text: "What do you want to search for? Say something like 'search for', followed by the keyword you want to search for,  or,  type it in the search bar ",
        });
      } else if (command.includes("search for")) {
        const search = command.split("search for")[1].trim();
        history.push({
          pathname: "/search",
          state: { text: search },
        });
        await speak({
          text: `searching ${search} videos from youtube`,
        });
      } else {
        history.push({
          pathname: "/search",
          state: { text: "" },
        });
        await speak({
          text: `Please say command like 'search for', followed by the keyword you want to search for,  or,  type it in the search bar `,
        });
      }
    }
  };

  recognition.onend = () => {
    if (!stopReco) {
      recognition.start();
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <div
        className="d-flex flex-column align-items-center justify-content-center position-fixed"
        style={{ zIndex: 99999, bottom: "5%", right: "30px" }}
      >
        <button
          type="button"
          onClick={() => {
            setStopReco((prevStopReco) => !prevStopReco);
            if (stopReco) {
              recognition.start();
              toast.dark("You can now give commands!");
            } else {
              recognition.stop();
              toast.dark("Taking commands stopped!");
            }
          }}
          className={`btn rounded-circle my-2 shadow  ${
            stopReco ? "btn-danger" : "btn-primary"
          }`}
        >
          {stopReco ? (
            <i className="fa fa-microphone-slash"></i>
          ) : (
            <i className="fa fa-microphone"></i>
          )}
        </button>
        <button
          type="button"
          className={`btn rounded-circle my-2 shadow btn-primary`}
          onClick={() => {
            if (!stopReco) {
              recognition.stop();
              toast.dark("Stopped Taking commands!");
            }
            setStopReco(true);
            setInstructionScreen(true);
            toast.dark(
              "Click on next or close button to start taking commands again!"
            );
          }}
        >
          <i className="fa fa-table"></i>
        </button>
      </div>
      {instructionsScreen && (
        <InstructionScreen
          setInstructionScreen={setInstructionScreen}
          setStopReco={setStopReco}
          stopReco={stopReco}
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
          <CurrentVideo setVideoRef={setVideoRef} />
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
        <Route path="/about" component={() => <About />} />
        <Route
          path="/contact"
          component={() => (
            <Contact
              nameRef={nameRef}
              emailRef={emailRef}
              messageRef={messageRef}
              submitRef={submitRef}
              newName={newName}
              newEmail={newEmail}
              newMessage={newMessage}
              submitForm={submitForm}
            />
          )}
        />
        <Route path="/search">
          <Search setStopReco={setStopReco} />
        </Route>
        <Route component={Page404} />
      </Switch>
    </div>
  );
};

export default App;
