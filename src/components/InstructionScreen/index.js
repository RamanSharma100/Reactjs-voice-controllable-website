import React from "react";

import "./style.scss";

const InstructionScreen = ({ setInstructionScreen }) => {
  return (
    <div className="col-md-12 instructions">
      <div className="card col-md-6 mx-auto mt-5 px-5 py-2">
        <div className="card-header bg-white d-flex align-items-center justify-content-between">
          <h4 className="card-title">Instructions</h4>
          <button
            type="button"
            className="close mb-3"
            onClick={() => setInstructionScreen(false)}
          >
            &times;
          </button>
        </div>
        <div className="card-body">
          <p>These are the some instructions</p>
        </div>
        <div className="card-footer  border-0 bg-white">
          <button type="button" className="btn btn-primary mx-auto w-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionScreen;
