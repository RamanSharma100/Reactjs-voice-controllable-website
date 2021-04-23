import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { speak } from "./api/voiceRecognition";

import "./App.scss";

import InstructionScreen from "./components/InstructionScreen";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

const App = () => {
  const [greet, setGreet] = useState(false);
  const [stopReco, setStopReco] = useState(true);
  const [instructionsScreen, setInstructionScreen] = useState(false);

  const Greet = async () => {
    await speak(
      "Welcome to the Voice controllable website. Please chekout the commands!. These commands will help you to controll website with voice!. Click on the Next button to start!.",
      stopReco,
      greet,
      setGreet,
      setStopReco
    );
  };

  useEffect(() => {
    if (!greet) {
      Greet();
    }
  }, [greet]);
  return (
    <div className="App">
      {instructionsScreen && (
        <InstructionScreen
          setInstructionScreen={setInstructionScreen}
          setStopReco={setStopReco}
        />
      )}
      <Navbar />
      <Switch>
        <Route exact path="/">
          <h1>This is home</h1>
          <Link to="/search">Search</Link>
        </Route>
        <Route exact path="/search">
          <Search setStopReco={setStopReco} setGreet={setGreet} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
