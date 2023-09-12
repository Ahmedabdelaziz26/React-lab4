import { Helmet } from "react-helmet-async";
import Spinner from "../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";

function NotFound() {
  const favorite = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Not Found </title>
      </Helmet>
      <p>
        NotFound {favorite} <Spinner />
      </p>
      <button className="btn btn-primary">change language</button>
    </>
  );
}

export default NotFound;
