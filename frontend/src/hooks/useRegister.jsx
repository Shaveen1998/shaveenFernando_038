import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../url";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(URL + "/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      setIsLoading(false);
      console.log(res);
      navigate("/login");
    } catch (err) {
      setError(
        err.response && err.response.data
          ? err.response.data
          : "An unknown error occurred"
      );
      setIsLoading(false);
      console.log("hello errorrrrrr", err.response.data);
    }
  };

  return { signup, isLoading, error };
};
