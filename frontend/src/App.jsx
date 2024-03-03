import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import MyRecipes from "./pages/myRecipes";

function App() {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route
        exact
        path="/"
        // element={user ? <Home /> : <Navigate to="/login" />}
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/recipes/:id"
        element={user ? <RecipeDetails /> : <Navigate to="/login" />}
      />
      <Route
        path="/create-recipe"
        element={user ? <CreateRecipe /> : <Navigate to="/login" />}
      />
      <Route
        path="/edit-recipe/:id"
        element={user ? <EditRecipe /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile/:id"
        element={user ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/myRecipes/:id"
        element={user ? <MyRecipes /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
