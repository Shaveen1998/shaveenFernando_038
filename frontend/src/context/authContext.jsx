/* eslint-disable react/prop-types */

// import { createContext, useReducer, useEffect } from "react";

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { user: action.payload };
//     case "LOGOUT":
//       return { user: null };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null,
//   });

//   useEffect(() => {
//     // Retrieve user from localStorage
//     const storedUser = localStorage.getItem("token");
//     if (storedUser) {
//       dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
//     }
//   }, []);

//   useEffect(() => {
//     // Save user to localStorage when user state changes
//     localStorage.setItem("token", JSON.stringify(state.user));
//   }, [state.user]);

//   console.log("AuthContext state:", state);

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { URL } from "../url";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(URL + "/api/auth/refetch", {
          withCredentials: true,
        });
        dispatch({ type: "LOGIN", payload: res.data });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  console.log("AuthUserContext state:", state);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
