import Card from "react-bootstrap/Card";
import "./SinglePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../components/axiosConfig/axiosInstance";
import { Progress } from "../ProgressCircle/ProgressCircle";
import "./SinglePage.css";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";

function SinglePage() {
  const loader = useSelector((state) => state.loader.loader);

  const { id } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(function () {
    axiosInstance
      .get(`/movie/${id}`)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
        console.log(res.data.release_date);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <>
      <Helmet>
        <title>{movie.original_title}</title>
      </Helmet>
      <Card className="bg-dark text-white cover my-5 ">
        <Card.Img
          height={"600"}
          className="opacity-25"
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path} `}
          alt="Card image"
        />
        <Card.ImgOverlay className="d-flex mt-4">
          {loader ? (
            <span calssName="">
              <Spinner />
            </span>
          ) : (
            <Card.Img
              className="post-image col-4 me-4"
              height={"500"}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path} `}
              alt="Card image"
            />
          )}

          <Card.Text className="m-3 fs-2 text-start col-8">
            <div className="d-flex justify-content-start flex-column">
              <span className="fw-bolder fs-1 py-1">
                {movie.original_title} (
                {movie.release_date && movie.release_date.split("-")[0]})
              </span>
              <span className="fw-bold fs-5 py-2 pt-0">
                <span className="fw-bolder fs-3 pe-2">.</span>Date :
                <span className="fw-light ms-2 fs-5 py-2">
                  {movie.release_date}
                </span>
                <span className="fw-bold ms-5 fs-5 ">
                  <span className="fw-bolder fs-3 pe-2">.</span>Language :
                  <span className="fw-light ps-2">
                    {movie.original_language &&
                      movie.original_language.toUpperCase()}
                  </span>
                </span>
                <span className="fw-bold ms-5 fs-5 ">
                  <span className="fw-bolder fs-3 pe-2">.</span>Status :
                  <span className="fw-light ps-2 ">{movie.status}</span>
                </span>
              </span>
              <span className="progressStyleS">
                <Progress precentage={movie.vote_average * 10} />
                <div className="progressStylePrecS">
                  {Math.round(movie.vote_average) * 10} <span>%</span>
                  <div className="progressScoreS">
                    <span className="d-block">User</span> Score
                  </div>
                </div>
              </span>
              <span className="fw-bold fs-5 py-2">
                Duration :
                <span className="fw-light ms-2 fs-5 py-2">
                  {(movie.runtime / 60).toFixed(2)} hr
                </span>
              </span>
              <span className="fw-bold fs-5 py-2 pb-4">
                Category :
                <span className="fw-bolder ms-2 fs-5 py-2">
                  {movie.genres &&
                    movie.genres.map((genre, index) => (
                      <span key={index}>
                        {genre.name}
                        {index < movie.genres.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </span>
              </span>
              <span className="fw-bold fs-4 py-2">Overview </span>
              <p className=" fs-5">{movie.overview} </p>
            </div>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}

export default SinglePage;
