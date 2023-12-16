// PopUp.jsx
import React from "react";

const PopUp = ({ popUp, setPopUp, handleAcceptReservation }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overlay flex justify-center items-center">
      <div className="w-[40%] h-[200px] bg-white flex flex-col items-center justify-center">
        <h1>Are You Sure? </h1>
        <p>Please confirm this operation before we start</p>
        <div>
          <button onClick={handleAcceptReservation}>Confirm</button>
          <button onClick={() => setPopUp(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
