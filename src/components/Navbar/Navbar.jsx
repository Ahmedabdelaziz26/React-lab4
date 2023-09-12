import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./Navbar.css";
import { useContext, useState } from "react";
import axiosInstance from "../../components/axiosConfig/axiosInstance";
import { useSelector } from "react-redux";
import { languageContext } from "../../context/language";
// import { favoriteContext } from "../../context/favorite";

function NavBar() {
  // const { favorite, setFavorite } = useContext(favoriteContext);
  const { language, setLanguage } = useContext(languageContext);

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const [searchedMovies, setSearchedMovies] = useState([]);

  const handleSearchSubmit = (event) => {
    //  perform a search action using the searchValue

    console.log("Search submitted:", searchValue);

    axiosInstance
      // .get(
      //   `/search/movie&query=${searchValue}`
      // )
      .get(`/search/movie`, {
        params: { query: searchValue },
      })
      // .get(
      //   `/search/movie?api_key=9bde527a522be317284baefbb6e3bd30&query=${searchValue}`
      // )
      .then((res) => {
        console.log(res.data.results);
        navigate("/search", {
          state: { searchResults: res.data.results, searchValue: searchValue },
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  function changeLanguae() {
    setLanguage(language == "EN" ? "AR" : "EN");
  }

  const favorite = useSelector((state) => state.favorite.favorite);

  return (
    <>
      <nav className="navbarStyle navbar navbar-expand-lg py-2">
        <div className="container py-1">
          <Navbar.Brand href="/">
            <img
              src={
                "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              }
              width="150px"
              alt="Logo"
            />
          </Navbar.Brand>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  col-7 d-flex justify-content-start text-light">
              <li className="nav-item mx-4 fw-bold">
                <NavLink className={"text-light text-decoration-none"} to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-4 fw-bold ">
                <NavLink
                  className={"text-light text-decoration-none"}
                  to="/favorite"
                >
                  Your Favorite
                  <span className={"text-danger ps-2"}>{favorite.length}</span>
                </NavLink>
              </li>

              <li className="nav-item mx-4 fw-bold">
                <NavLink
                  className={"text-light text-decoration-none"}
                  to="/single/:id"
                >
                  Single{" "}
                </NavLink>
              </li>
              {/* <li className="nav-item mx-4 fw-bold">
                <NavLink className={"text-light text-decoration-none"} to="/">More</NavLink>
              </li> */}
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5 col-3 d-flex justify-content-end ">
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit();
                    }
                  }}
                />
              </Col>

              <li className="nav-item">
                <span className="nav-link fw-bold text-light">
                  <NavLink
                    className={"text-light text-decoration-none"}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link fw-bold text-light">
                  <NavLink
                    className={"text-light text-decoration-none"}
                    to="/singup"
                  >
                    Register
                  </NavLink>
                </span>
              </li>
              <li className=" ">
                <span className="nav-link fw-bold text-light ">
                  <NavLink
                    className={"text-danger text-decoration-none"}
                    onClick={changeLanguae}
                  >
                    {language}
                  </NavLink>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
