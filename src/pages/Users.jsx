// Users.js
import React, { useEffect, useState } from "react";
import UserCard from "../components/users/UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const res = await fetch(`${apiUrl}api/users/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized"); // Handle unauthorized access
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getUsers();
  }, [apiUrl]);

  return (
    <div className="overflow-y-hidden">
      {users && (
        <div>
          <h2 className="px-10 py-4 text-3xl font-bold text-[#3B28CC]">
            Users
          </h2>
          <div className="flex justify-between px-10">
            <div className="w-[70%] min-h-screen flex flex-col gap-2">
              {users?.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
            <div className="w-[30%] min-h-screen"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
