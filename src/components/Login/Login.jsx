import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function validation(event) {
    console.log(event.target);

    if (event.target.name === "email") {
      setUser({ ...user, email: event.target.value });
      setErrors({
        ...errors,
        emailError:
          event.target.value.length === 0
            ? "Email is Required"
            : /^[A-Za-z0-9]{3}@[A-Za-z0-9]{4}\.com$/.test(event.target.value)
            ? ""
            : "Invalid Email Format Should Match ***@****.com",
      });
    }

    if (event.target.name == "password") {
      setUser({ ...user, password: event.target.value });
      setErrors({
        ...errors,
        passwordError:
          event.target.value == 0
            ? "Password is required"
            : event.target.value.length == 8
            ? ""
            : "Password Must Be 8 Characters Only",
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
        <div className="container text-center col-6 ">
          <div className="card mb-3 ">
            <div className="card-header">Log In</div>
            <div className="card-body">
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
              >
                <div className="form-group row mb-2">
                  <label className="col-md-2 col-form-label" htmlFor="email">
                    Email
                  </label>
                  <div className="col-md-8">
                    <input
                      type="email"
                      className={`form-control ${
                        errors.emailError && "is-invalid"
                      }`}
                      name="email"
                      id="email"
                      value={user.email}
                      onChange={(e) => validation(e)}
                    />
                    <span className="invalid-feedback text-start">
                      {errors.emailError}
                    </span>
                  </div>
                </div>
                <div className="form-group row mb-2">
                  <label htmlFor="password" className="col-md-2 col-form-label">
                    password
                  </label>
                  <div className="col-md-8">
                    <div className="input-group ">
                      <input
                        type={!showPassword ? "password" : "text"}
                        className={`form-control ${
                          errors.passwordError && "is-invalid"
                        }`}
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => validation(e)}
                      />
                      <span
                        className="btn btn-outline-light ms-1 text-dark"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      <span className="invalid-feedback text-start">
                        {errors.passwordError}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-success col-4"
                  disabled={errors.emailError || errors.passwordError}
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
