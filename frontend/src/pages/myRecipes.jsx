import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import Loader from "../components/Loader";
import { useAuthContext } from "../hooks/useAuthContext";
import HomeRecipes from "../components/HomeRecipes";

const MyRecipes = () => {
  const { search } = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useAuthContext();

  const fetchRecipes = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/recipes/user/" + user._id);
      // console.log(res.data)
      setRecipes(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [search]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          recipes.map((recipe) => (
            <>
              <Link to={user ? `/posts/post/${recipe._id}` : "/login"}>
                <HomeRecipes key={recipe._id} recipe={recipe} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No Recipes available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyRecipes;
