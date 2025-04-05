import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import SigninPage from "./components/templates/authentication/SigninPage";
import ForgetPassPage from "./components/templates/authentication/ForgetPasswordPage";
import ForgetPage from "./components/templates/authentication/ForgetPage";
import AcceptPage from "./components/templates/authentication/AcceptPage";
import Cookies from "js-cookie";
import BookCategoryPage from "./components/templates/pages/BookCategoryPage";
import Dashboard from "./components/templates/pages/Dashboard";
import BookListPage from "./components/templates/pages/BookListPage";
import Chapters from "./components/templates/pages/Chapters";

const Authorized = ({ element }) => {
  const token = Cookies.get("authToken");
  // console.log("token:", token);
  return token !== undefined ? <Navigate replace to="/dashboard" /> : element;
};

const UnAuthorized = ({ element }) => {
  const token = Cookies.get("authToken");
  // console.log("token:", token);
  return token !== undefined ? element : <Navigate replace to="/signin" />;
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/signin"
          element={<Authorized element={<SigninPage />} />}
        />
        <Route
          path="/forgetPass"
          element={<Authorized element={<ForgetPassPage />} />}
        />
        <Route
          path="/accept"
          element={<Authorized element={<AcceptPage />} />}
        />
        <Route
          path="/bookcategories"
          element={<UnAuthorized element={<BookCategoryPage />} />}
        />
        <Route
          path="/dashboard"
          element={<UnAuthorized element={<Dashboard />} />}
        />

        <Route
          path="/bookslist"
          element={<UnAuthorized element={<BookListPage />} />}
        />

        <Route
          path="/chapters/:id"
          element={<UnAuthorized element={<Chapters />} />}
        />

        {/* <Route path="/forgetPasss" element={<ForgetPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
