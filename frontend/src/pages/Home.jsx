import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuthContext } from "../hooks/useAuthContext";
import HomeRecipes from "../components/HomeRecipes";

const Home = () => {
  const { search } = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useAuthContext();

  const fetchRecipes = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/recipes/" + search);
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
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          recipes.map((recipe) => (
            <>
              <Link to={user ? `/recipes/${recipe._id}` : "/login"}>
                <HomeRecipes key={recipe._id} recipe={recipe} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No Recipes available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
