import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL, IF } from "../url";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
// import { StarRating } from "../components/StarRating";

const RecipeDetails = () => {
  const recipeId = useParams().id;
  const [recipe, setRecipe] = useState({});
  const { user } = useAuthContext();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const [starRating, setStarRating] = useState(null);
  const [avgStarRating, setAvgStarRating] = useState(null);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(URL + "/api/recipes/" + recipeId);
      // console.log(res.data)
      setRecipe(res.data);
    } catch (err) {
      console.log("fetchrecipe error", err);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const fetchRecipeComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/recipe/" + recipeId);
      setComments(res.data);
      console.log(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipeComments();
  }, [recipeId]);

  const fetchAvgStarRating = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        URL + "/api/comments/average/recipe/" + recipeId
      );
      console.log(res.data);
      setAvgStarRating(res.data.average);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAvgStarRating();
  }, [recipeId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.firstName,
          recipeId: recipeId,
          userId: user._id,
          rating: starRating,
        },
        { withCredentials: true }
      );
      console.log(res);

      // fetchPostComments()
      // setComment("")
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {recipe.title}
            </h1>
            <p>
              <span className="font-bold">Average Rating : </span>
              {avgStarRating}
            </p>

            <div className="flex items-center justify-center space-x-2">
              <p>
                <span className="font-bold">Cooking Time</span>{" "}
                {recipe.timeToCook}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>
              <span className="font-bold">Posted by</span> : {recipe.username}
            </p>
            <div className="flex space-x-2">
              <p>{new Date(recipe.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(recipe.timeToCook).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img
            src={IF + recipe.photo}
            className="w-full  mx-auto mt-8"
            alt=""
          />
          <p className="mx-auto mt-8">{recipe.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Ingredients:</p>
            <div className="flex justify-center items-center space-x-2">
              {recipe.ingredients?.map((ingredient, i) => (
                <>
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                    {ingredient}
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <p>
              <span className="font-bold">Steps</span> {recipe.steps}
            </p>
          </div>
          {recipe.steps}
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} recipe={recipe} />
            ))}
          </div>
          {/* write a comment */}

          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <input
              onChange={(e) => setStarRating(e.target.value)}
              type="number"
              placeholder="Write a rating"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <button
              onClick={postComment}
              className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RecipeDetails;
