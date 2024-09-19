import { Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import LandingPage from "./pages/LandingPage";
import { Container } from "@mui/material";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/helper/PrivateRoute";
import PublicRoute from "./components/helper/PublicRoute";
import EditBlogPage from "./pages/EditBlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="" element={<PrivateRoute element={<LandingPage />} />} />
          <Route
            path="/edit/:blogId"
            element={<PrivateRoute element={<EditBlogPage />} />}
          />
          <Route
            path="/view/:blogId"
            element={<PrivateRoute element={<BlogDetailsPage />} />}
          />
          <Route
            restricted={true}
            path="/register"
            element={
              <PublicRoute element={<RegisterPage />} restricted={true} />
            }
          />
          <Route
            restricted={true}
            path="/login"
            element={<PublicRoute element={<LoginPage />} restricted={true} />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
