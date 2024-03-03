import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

const EditRecipe = () => {
  const recipeId = useParams().id;
  const user = useAuthContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState("");
  const [file, setFile] = useState(null);
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [timeToCook, setTimeToCook] = useState("");

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/recipe/" + recipeId);
      setTitle(res.data.title);
      setSteps(res.data.steps);
      setFile(res.data.photo);
      setIngredients(res.data.categories);
      setTimeToCook(res.data.timeToCook);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const recipe = {
      title,
      steps,
      username: user.firstName,
      userId: user._id,
      ingredients: ingredients,
      timeToCook,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      recipe.photo = filename;
      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
        console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }
    }
    //post upload

    try {
      const res = await axios.put(URL + "/api/posts/" + recipeId, recipe, {
        withCredentials: true,
      });
      navigate("/recipes/" + res.data._id);
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [recipeId]);

  const deleteCategory = (i) => {
    let updatedIngredients = [...ingredients];
    updatedIngredients.splice(i);
    setIngredients(updatedIngredients);
  };

  const addCategory = () => {
    let updatedIngredients = [...ingredients];
    updatedIngredients.push(ingredient);
    setIngredient("");
    setIngredients(updatedIngredients);
  };
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl ">Edit recipe</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter recipe title"
            className="px-4 py-2 outline-none"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4"
          />

          <input
            onChange={(e) => setTimeToCook(e.target.value)}
            value={timeToCook}
            type="text"
            placeholder="Enter cooking time"
            className="px-4 py-2 outline-none"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter recipe ingredients"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {ingredients?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setSteps(e.target.value)}
            value={steps}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter recipe steps"
          />
          <button
            onClick={handleUpdate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditRecipe;
