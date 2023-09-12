import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";

// hook that handel the state i pass with navigation in navbar
import { useLocation } from "react-router-dom";
import { Progress } from "../ProgressCircle/ProgressCircle";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../../store/slices/favorite";

const Favorite = () => {
  const location = useLocation();

  const navigate = useNavigate();
  function handleImageClick(event) {
    navigate(`/single/${event.target.id}`);
  }

  // handel favorite function
  const favorite = useSelector((state) => state.favorite.favorite);
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Favorite List</title>
      </Helmet>
      <h2 className="text-center">Favorite Movies</h2>
      <div className="container-fluid row">
        {/* //card */}
        {favorite.map((movie) => (
          <div key={movie.id} className="col-md-3 my-5">
            <Col>
              <Card className="shadow rounded-3">
                <Card.Img
                  id={movie.id}
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path} `}
                  onClick={() => {
                    handleImageClick(event);
                  }}
                />
                <span className="progressStyle">
                  <Progress precentage={movie.vote_average * 10} />
                  <div className="progressStylePrec">
                    {movie.vote_average * 10} <span>%</span>
                  </div>
                </span>
                <span
                  className="favorite-icon  fs-2 text-end"
                  onClick={() => dispatch(removeFavorite(movie.id))}
                >
                  <MdOutlineFavorite style={{ fill: "red" }} />
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

export default Favorite;
