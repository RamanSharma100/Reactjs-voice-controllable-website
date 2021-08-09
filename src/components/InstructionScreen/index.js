import React from "react";
import { recognition } from "../../api/voiceRecognition";

import "./style.scss";

import CommandsTable from "./CommandsTable";

const InstructionScreen = ({ setInstructionScreen, setStopReco }) => {
  return (
    <div className="col-md-12 instructions">
      <div className="card col-md-6 mx-auto mt-5 px-5 py-2">
        <div className="card-header bg-white d-flex align-items-center justify-content-between">
          <h4 className="card-title">Instructions</h4>
          <button
            type="button"
            className="close mb-3"
            onClick={() => {
              setInstructionScreen(false);
              recognition.start();
            }}
          >
            &times;
          </button>
        </div>
        <div className="card-body">
          <p className="py-5">
            These are the following commands which will help you to run it with
            voice commands:-
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: ["Stop Recognition", "Stop Taking Commands"],
                info: "to stop commands after starting with commands",
              },
            ]}
          />
          {/* navigation commands */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Navigation Commands
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: [
                  "Go to <_page_name_> page/route",
                  "Go to <_page_name_>",
                  "Go to <_route_name_> page/route",
                  "Go to <_route_name_>",
                ],
                info:
                  "This will help you to navigate to pages <br/> Example:- Go to Home/Index Page/route, Go to Home/Index, Go to video/videos page/route ",
              },
            ]}
          />
          {/* end navigation commands */}
          <button
            type="button"
            onClick={() => {
              setStopReco(false);
              recognition.start();
              setInstructionScreen(false);
            }}
            className="btn btn-primary mx-auto w-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionScreen;
