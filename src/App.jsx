import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./components/Home/Home";
import NavBar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Favorite from "./components/Favorite/Favorite";
import SinglePage from "./components/SinglePage/SinglePage";
import NotFound from "./components/NotFound/NotFound";
import SearchResultPage from "./components/SearchResultPage/SearchResultPage";
import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store/store";
import { LanguageProvider } from "./context/language";

// create routes for navigation bar components
const router = createBrowserRouter([
  {
    //general path
    path: "/",
    element: <AppLayout />,
    // child path in navigation bar component
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/singup", element: <SignUp /> },
      { path: "/favorite", element: <Favorite /> },
      { path: "/single/:id", element: <SinglePage /> },
      { path: "/search", element: <SearchResultPage /> }, // Add the search route
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const [language, setLanguage] = useState("EN");

  return (
    <Provider store={store}>
      <LanguageProvider value={{ language, setLanguage }}>
        <HelmetProvider>
          <RouterProvider router={router} />;
          <Helmet>
            <title>Popular Movies</title>
          </Helmet>
        </HelmetProvider>
      </LanguageProvider>
    </Provider>
  );
}

export default App;
