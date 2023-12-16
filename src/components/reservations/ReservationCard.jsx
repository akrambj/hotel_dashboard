import { ArrowRightAlt, Check, Close } from "@mui/icons-material";
import { useState } from "react";

const ReservationCard = ({ reservation }) => {
  const [popUp, setPopUp] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [refusing, setRefusing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const formatDate = (dateString) => {
    const options = { month: "numeric", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAcceptReservation = async (reservationId) => {
    try {
      setLoading(true);

      const accessToken = localStorage.getItem("accessToken");

      const res = await fetch(
        `${apiUrl}api/reservations/accept/${reservationId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        // Reservation accepted successfully
        setResponseMessage("Reservation accepted successfully!");
        // Add logic as needed
      } else {
        // Handle failure, e.g., show an error message
        setResponseMessage("Accepting reservation failed!");
      }
    } catch (error) {
      console.error("Error during accepting reservation:", error);
      setResponseMessage("Error during accepting reservation");
    } finally {
      setLoading(false);
      // Display the message for 2 seconds and then close the popup
      setTimeout(() => {
        setPopUp(false);
        setResponseMessage(null);
      }, 2000);
    }
  };

  const handleRefuseReservation = async (reservationId) => {
    try {
      setLoading(true);

      const accessToken = localStorage.getItem("accessToken");

      const res = await fetch(
        `${apiUrl}api/reservations/refuse/${reservationId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        // Reservation refused successfully
        setResponseMessage("Reservation refused successfully!");
        // Add logic as needed
      } else {
        // Handle failure, e.g., show an error message
        setResponseMessage("Refusing reservation failed!");
      }
    } catch (error) {
      console.error("Error during refusing reservation:", error);
      setResponseMessage("Error during refusing reservation");
    } finally {
      setLoading(false);
      // Display the message for 2 seconds and then close the popup
      setTimeout(() => {
        setPopUp(false);
        setResponseMessage(null);
      }, 2000);
    }
  };

  return (
    <div className="flex items-center gap-5 ">
      {reservation.user && (
        <div className="flex items-center gap-2 w-[20%]">
          <img
            className="w-[35px] h-[35px] rounded-full"
            src={reservation.user.image}
            alt=""
          />
          <h2>{reservation.user.username}</h2>
        </div>
      )}
      <div className="w-[20%]">
        <button
          className={`${
            reservation.isAccepted === true
              ? "bg-green-500"
              : reservation.isPending === true
              ? "bg-red-500"
              : "bg-gray-300"
          } w-[100px] text-white py-1 rounded-md font-medium capitalize`}
        >
          {reservation.isAccepted === true
            ? "done"
            : reservation.isPending === true
            ? "pending"
            : "canceled"}
        </button>
      </div>
      <div className="flex items-center text-[#8E8E8E] font-medium w-[20%]">
        <h5>{formatDate(reservation.debutDate)}</h5>
        <ArrowRightAlt />
        <h5>{formatDate(reservation.endDate)}</h5>
      </div>
      {reservation.room && (
        <div className="w-[20%]  text-center">
          <h4 className="capitalize font-medium">
            room{reservation.room.door}
          </h4>
        </div>
      )}
      <div>
        <button
          onClick={() => {
            setPopUp(true);
            setAccepting(true);
          }}
        >
          <Check className="text-[#3B28CC]" />
        </button>
        <button
          onClick={() => {
            setPopUp(true);
            setRefusing(true);
          }}
        >
          <Close className="text-[#8E8E8E]" />
        </button>
      </div>
      {popUp && (
        <div className="fixed top-0 left-0 right-0 bottom-0 overlay flex justify-center items-center">
          <div className="w-[40%] h-[200px] bg-white flex flex-col items-center justify-center rounded-lg gap-5">
            {responseMessage && (
              <div className="absolute flex items-center h-[60px] rounded-lg justify-between bg-[#E9E9E9] w-[300px] ">
                <div
                  className={`w-[22%] h-full bg-[#28CC42] flex justify-center rounded-l-lg items-center`}
                >
                  <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center">
                    <h1 className={`text-2xl font-bold "text-[#28CC42]`}>
                      <Check />
                    </h1>
                  </div>
                </div>
                <h2 className="text-center text-sm font-semibold">
                  {responseMessage}
                </h2>
                <h2 className="px-2">
                  <button onClick={() => setPopUp(false)}>
                    <Close />
                  </button>
                </h2>
              </div>
            )}

            <h1 className="text-[#3B28CC] font-bold text-3xl">
              {accepting ? "Accept Reservation?" : "Refuse Reservation?"}
            </h1>
            <p className="text-[#3828CC] font-medium">
              Please confirm this operation before we start
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                className={`${
                  loading ? "spinner" : ""
                } w-[120px] py-2 bg-[#3B28CC] text-white rounded-md`}
                onClick={() =>
                  accepting
                    ? handleAcceptReservation(reservation._id)
                    : handleRefuseReservation(reservation._id)
                }
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-container"></div>
                ) : (
                  "Confirm"
                )}
              </button>
              <button
                className="w-[120px] py-2 text-[#8E8E8E] border-2 border-[#8E8E8E]"
                onClick={() => setPopUp(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
