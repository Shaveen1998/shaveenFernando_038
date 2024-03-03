import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

function Navbar() {
  const { user } = useAuthContext();
  const [prompt, setPrompt] = useState("");
  console.log(prompt);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Recipe World</Link>
      </h1>
      {/* search bar */}
      {user ? (
        <div className="flex justify-center items-center space-x-0">
          <p
            className="cursor-pointer"
            onClick={() => {
              navigate(prompt ? "?search=" + prompt : navigate("/"));
            }}
          >
            <BsSearch />
          </p>
          <input
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            className="outline-none px-3 "
            placeholder="Search a post"
            type="text"
          />
        </div>
      ) : (
        <div></div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/create-recipe">Create a Recipe</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
}

export default Navbar;
