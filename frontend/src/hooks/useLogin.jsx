import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../url";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      // update the auth context
      dispatch({ type: "LOGIN", payload: res.data });
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setError(
        err.response && err.response.data
          ? err.response.data
          : "An unknown error occurred"
      );
      console.log(err.response.data);
    }
  };

  return { login, isLoading, error };
};
