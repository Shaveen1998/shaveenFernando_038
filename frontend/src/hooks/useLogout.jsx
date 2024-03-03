import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.get(URL + "/api/auth/logout");
    } catch (err) {
      console.log(err);
      setError("Logout failed"); // Set error state if logout fails
    }

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    setIsLoading(false); // Reset isLoading state after logout process
    navigate("/login");
  };

  return { logout, error, isLoading };
};
