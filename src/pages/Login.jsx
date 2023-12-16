import { Check, Close, Error } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [popUp, setPopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState(false);
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    setIsPending(true);
    try {
      const res = await fetch(`${apiUrl}api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        // Successful login logic
        const data = await res.json();
        setIsPending(false);
        setUserValidated(true);
        setIsAuthenticated(true);
        navigate("/");
        // Store the access token in local storage
        localStorage.setItem("accessToken", data.accessToken);

        // Set the popup content for success
        setPopUp(true);
        setPopUpContent("Login successful!");

        // Close the popup after 2000 milliseconds (2 seconds)
        setTimeout(() => {
          setPopUp(false);
          setPopUpContent("");
        }, 2000);
      } else {
        // Handle login failure, e.g., show an error message
        console.log("Login failed!");
        setPopUp(false);

        // Set the popup content for failure
        setPopUp(true);
        setPopUpContent("You have Something Wrong");
        setIsPending(false);

        // Close the popup after 2000 milliseconds (2 seconds)
        setTimeout(() => {
          setPopUp(false);
          setPopUpContent("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-10 items-center  justify-center w-full h-[100vh] login overflow-x-hidden">
      {popUp && (
        <div className="relative flex items-center h-[60px] rounded-lg justify-between bg-[#E9E9E9] w-[300px] ">
          <div
            className={`w-[22%] h-full ${
              userValidated ? "bg-[#28CC42]" : "bg-[#CC2828]"
            }  flex justify-center rounded-l-lg items-center`}
          >
            <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center">
              <h1
                className={`text-2xl font-bold ${
                  userValidated ? "text-[#28CC42]" : "text-[#CC2828]"
                }`}
              >
                {userValidated ? <Check /> : "!"}
              </h1>
            </div>
          </div>
          <h2 className="text-center text-sm font-semibold">{popUpContent}</h2>
          <h2 className="px-2">
            <button onClick={() => setPopUp(false)}>
              <Close />
            </button>
          </h2>
        </div>
      )}
      <h1 className="text-3xl font-bold text-[#3B28CC] lg:text-4xl">Login</h1>
      <form
        className="flex flex-col items-center justify-center gap-4 lg:gap-7"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-[#E9E9E9] w-[300px] p-2 placeholder:text-black font-semibold rounded-lg lg:w-[400px] lg:py-4"
          placeholder="email"
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
        <input
          className="bg-[#E9E9E9] w-[300px] p-2 placeholder:text-black font-semibold rounded-lg lg:w-[400px] lg:py-4"
          placeholder="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-[#3B28CC] text-white w-[120px] h-[40px] rounded-md text-nd"
          disabled={isPending}
        >
          {isPending ? (
            <div className="spinner-container"></div>
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
      <div className="loginPage01 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px]  rotate-45 absolute bottom-0 left-0 md:-left-[20%] md:top-[25%] overrflow-x-hidden"></div>
      <div className="loginPage02 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] rotate-45  absolute top-0 lg:top-[30%] right-0 md:-right-[20%] md:top-[25%] overrflow-x-hidden"></div>
    </div>
  );
};

export default Login;
