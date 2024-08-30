import React from "react";
import { recognition } from "../../api/voiceRecognition";
import { useSpeechSynthesis } from "react-speech-kit";

import "./style.scss";

import CommandsTable from "./CommandsTable";
import { toast } from "react-toastify";

const InstructionScreen = ({ stopReco, setInstructionScreen, setStopReco }) => {
  const { speak } = useSpeechSynthesis();
  return (
    <div className="col-md-12 instructions">
      <div className="card col-md-6 mx-auto mt-5 px-5 py-2">
        <div className="card-header bg-white d-flex align-items-center justify-content-between">
          <h4 className="card-title">Instructions</h4>
          <button
            type="button"
            className="close mb-3"
            onClick={async () => {
              setInstructionScreen(false);
              toast.dark("Start taking commands!");
              if (stopReco) {
                recognition.start();
              }
              await speak({ text: "Start taking commands!" });
              setStopReco(false);
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
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Stop Taking Voice Commands
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
                  "Navigate to <_page_name_> page/route",
                  "Navigate to <_page_name_>",
                  "Navigate to <_route_name_> page/route",
                  "Navigate to <_route_name_>",
                ],
                info: "This will help you to navigate to pages <br/> Example:- Navigate to Home/Index Page/route, Navigate to Home/Index, Navigate to video/videos page/route ",
              },
            ]}
          />
          {/* end navigation commands */}
          {/* form filling and submitting commands */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Form Filling and Submission Commands
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: [
                  "Add <_field_name_> <_value_>",
                  "Type <_field_name_> <_value_>",
                  "Insert <_field_name_> <_value_>",
                ],
                info: "This will help you to insert value in the field <br/> Example:- Add name John, Type name John, Insert name John",
              },
              {
                commands: ["Submit form", "Submit"],
                info: "This will help you to submit the form <br/> Example:- Submit form",
              },
            ]}
          />
          {/* end form filling and submitting commands */}
          {/* open video commands -home page  */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Open Video Commands - Home Page
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: [
                  "open video number <_number_>",
                  "open video number <_number_> from uploads",
                  "open video number <_number_> from popular uploads",
                ],
                info: "This will help you to select the particular video in home page <br/> Example:- open video number 1, open video number 1 from uploads, open video number 1 from popular uploads ",
              },
            ]}
          />
          {/* end open video commands - home page   */}
          {/* open video commands  - home page dialog box  */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Open Video Commands - Home Page Dialog Box
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: ["open video number <_number_>"],
                info: "In home page when you will select any video using <p class='bg-dark text-white py-1 px-2 mt-2  '>open video number <_number_></p> command in home page a dialog box will appear <br/> Example:- <br/> step 1 :- say  `open video number 1` <br/> step 2 :- Dialog box will appear to select from two videos <br/> step 3 :- now choose one of two videos from dialog box by command `open video number 1 or 2`",
              },
            ]}
          />
          {/* end open video commands dialog box  */}
          {/* open video commands - videos page  */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Open Video Commands - Videos Page
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: ["open video number <_number_>", "next page"],
                info: "This will help you to select any video showing per page from 12 videos. <br/> You can select only one video from showing 12 videos. <br/> Videos page will consist of 12 videos per page as it contains pagination. <br/> pagination commands are given in next table. <br/> Example:- open video number 10",
              },
            ]}
          />
          {/* end open video commands - videos page  */}
          {/* controlling video commands - videos page  */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Controlling Video Commands
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: ["play", "start", "play video", "start video"],
                info: "Play video when it is paused",
              },
              {
                commands: ["pause", "stop", "pause video", "stop video"],
                info: "Pause video when it is playing",
              },
            ]}
          />
          {/* end controlling video commands - videos page  */}
          {/* next/prev page command - videos page  */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Open Next/Prev page of pagination - videos page
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: [
                  "next page",
                  "next",
                  "prev page",
                  "prev",
                  "previous",
                  "previous page",
                ],
                info: "This will help you to make next and previous page in videos page as it contains pagination. <br/> Ther commands will work only in videos page. <br/> Example:- next page, previous page, next, previous",
              },
            ]}
          />
          {/* end next/prev page command - videos page  */}
          {/* go back/next route or by history of the page commands  */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Go Back/Next Route/History of the application commands
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: [
                  "go back",
                  "go to prev page",
                  "go to previous page",
                  "go backward",
                  "go forward",
                  "go next",
                  "go to next page",
                ],
                info: "These commands will help you to move next/back of the page in browser history of the application",
              },
            ]}
          />
          {/* end go back/next route or by history of the page commands  */}

          {/* scrolling commands  */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Scrolling commands
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: [
                  "go bottom",
                  "go to bottom",
                  "go top",
                  "go to top",
                  "go to half",
                  "go to half of the page",
                  "scroll to half",
                  "scroll to bottom/top",
                  "scroll/move by <_number_> px/pixel/percentage/percent/%",
                  "scroll/move to <_number_> px/pixel/percentage/percent/%",
                  "scroll up/down",
                  "move up/down",
                ],
                info: "This will help you to scroll the page <br/> Example:- go bottom, go to bottom, scroll to bottom, scroll to bottom, scroll to 10%, scroll by 10px ",
              },
            ]}
          />
          {/* end scrolling commands  */}
          {/* open commands table  */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Search with voice commands
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: [
                  "open search page",
                  "open search",
                  "search for me",
                  "search",
                  "search video",
                ],
                info: "This will help you to open search page <br/> Example:- open search page, open search, search for me, search, search video",
              },
              {
                commands: ["search for <_keyword_>"],
                info: "This will help you to search for any keyword using voice <br/> Example:- search for web tutorials",
              },
            ]}
          />
          {/* end open commands table  */}
          {/* voice search  */}
          <p className="bg-primary text-white border-bottom py-3 my-4 text-center">
            Open Commands Table command
          </p>
          <CommandsTable
            cols={["commands", "use"]}
            rows={[
              {
                commands: ["open commands table"],
                info: "This will help you to open commands table ",
              },
            ]}
          />
          {/* end voice search  */}
          <button
            type="button"
            onClick={() => {
              setStopReco(false);
              recognition.start();
              setInstructionScreen(false);
            }}
            className="btn btn-primary mx-auto mb-4 w-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionScreen;
