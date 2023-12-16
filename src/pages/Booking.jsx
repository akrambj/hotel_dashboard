import React, { useEffect, useState } from "react";
import ReservationCard from "../components/reservations/ReservationCard";

const Booking = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getReservations = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const res = await fetch(`${apiUrl}api/reservations/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized"); // Handle unauthorized access
        }

        const data = await res.json();
        setReservations(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getReservations();
  }, [apiUrl]);

  console.log(reservations);

  return (
    <div className="overflow-y-hidden ">
      {reservations && (
        <div>
          <h2 className="px-10 py-4 text-3xl font-bold text-[#3B28CC]">
            Booking
          </h2>
          <div className="flex justify-between px-10">
            <div className="w-[70%] min-h-screen flex flex-col gap-2">
              {reservations.map((reservation) => (
                <ReservationCard
                  key={reservation._id}
                  reservation={reservation}
                />
              ))}
            </div>
            <div className="w-[30%] min-h-screen"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
