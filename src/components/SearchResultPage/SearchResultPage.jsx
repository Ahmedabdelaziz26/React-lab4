import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import "./SearchResultPage.css";

// hook that handel the state i pass with navigation in navbar
import { useLocation } from "react-router-dom";
import { Progress } from "../ProgressCircle/ProgressCircle";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/slices/favorite";
import { MdOutlineFavorite } from "react-icons/md";
import loader from "../../store/slices/loader";
import Spinner from "../Spinner/Spinner";

const SearchResultPage = () => {
  const location = useLocation();
    const loader = useSelector((state) => state.loader.loader);


  const searchResults = location.state.searchResults;
  const searchValue = location.state.searchValue;
  useEffect(() => {
    console.log(location);
    console.log(location.state.searchResults);
  }, []);

  const navigate = useNavigate();
  function handleImageClick(event) {
    navigate(`/single/${event.target.id}`);
  }

  // HANDEL ADD FAVORITE WITH DISBATCH
  const favorite = useSelector((state) => state.favorite.favorite);
  const dispatch = useDispatch();

  const handleAddToFavorites = (movie) => {
    const movieId = movie.id;
    if (favorite.some((favMovie) => favMovie.id === movieId)) {
      // Movie is already in favorites, remove it
      dispatch(removeFavorite(movie.id));
      console.log("movie removed from favorites");
    } else {
      // Movie is not in favorites, add it
      dispatch(addFavorite(movie));
      console.log("movie added to favorites");
    }
  };
  console.log(favorite);

  // check if favorites contains the movie
  const isFavorite = (movieID) =>
    movieID && favorite.some((favMovie) => favMovie.id === movieID);

  return (
    <>
      <Helmet>
        <title>Search of {searchValue}</title>
      </Helmet>
      <h2
        style={{ color: "#66cc95", fontWeight: "bolder" }}
        className="text-center"
      >
        Result of :{" "}
        <span style={{ color: "#379fd5" }} className="fs-1 fw-bold">
          {searchValue}
        </span>{" "}
      </h2>
      <div className="container-fluid row">
        {/* //card */}
        {searchResults.map((movie) => (
          <div key={movie.id} className="col-md-3 my-5">
            <Col>
              <Card className="shadow rounded-3">
                {loader ? (
                  <span calssName="">
                    <Spinner />
                  </span>
                ) : (
                  <Card.Img
                    id={movie.id}
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path} `}
                    onClick={() => {
                      handleImageClick(event);
                    }}
                  />
                )}
                <span className="progressStyle">
                  <Progress precentage={movie.vote_average * 10} />
                  <div className="progressStylePrec">
                    {movie.vote_average * 10} <span>%</span>
                  </div>
                </span>
                <span
                  className="favorite-icon  fs-2 text-end"
                  onClick={() => handleAddToFavorites(movie)}
                >
                  {isFavorite(movie.id) ? (
                    <MdOutlineFavorite style={{ fill: "red" }} />
                  ) : (
                    <MdOutlineFavorite style={{ fill: "wheat" }} />
                  )}
                </span>
                <Card.Body className="d-flex flex-column justify-content-start align-self-start">
                  <div className="cardBody">
                    <span className="fw-bolder my-0 py-3 ">
                      <Link className="anchorStyle" to={`/single/${movie.id}`}>
                        {movie.original_title}
                      </Link>
                    </span>
                    <span className="my-0 pt-1 text-secondary cardBodyT">
                      {movie.release_date}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResultPage;
