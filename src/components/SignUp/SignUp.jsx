import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    usernameError: "",
    passwordError: "",
    confirmpasswordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function validation(event) {
    console.log(event.target);

    //name
    if (event.target.name === "name") {
      setUser({ ...user, name: event.target.value });
      setErrors({
        ...errors,
        nameError: event.target.value.length === 0 ? "Name is Required" : "",
      });
    }

    //email
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
    //username
    if (event.target.name === "username") {
      setUser({ ...user, username: event.target.value });
      setErrors({
        ...errors,
        usernameError:
          event.target.value.length === 0
            ? "username is Required"
            : event.target.value.includes(" ")
            ? "Invalid username Should`nt Contain Space Characters"
            : "",
      });
    }

    //password
    if (event.target.name === "password") {
      const password = event.target.value;
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

      setUser({ ...user, password: password });
      setErrors({
        ...errors,
        passwordError:
          password.length === 0
            ? "Password is required"
            : password.length < 8
            ? "Password Must Be Larger Than 8 Characters"
            : !hasLowerCase || !hasUpperCase || !hasDigit || !hasSpecialChar
            ? "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
            : "",
      });
    }

    //confirmpassword
    if (event.target.name === "confirmpassword") {
      setUser({ ...user, confirmpassword: event.target.value });
      setErrors({
        ...errors,
        confirmpasswordError:
          event.target.value.length === 0
            ? "confirmpassword is Required"
            : event.target.value === user.password
            ? ""
            : "Should Matches Previous Password",
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
        <div className="container text-center col-6 ">
          <div className="card mb-3 ">
            <div className="card-header">Sign Up</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-2">
                  <label className="col-md-2 col-form-label" htmlFor="name">
                    Name
                  </label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.nameError && "is-invalid"
                      }`}
                      name="name"
                      id="name"
                      value={user.name}
                      onChange={(e) => validation(e)}
                    />
                    <span className="invalid-feedback text-start">
                      {errors.nameError}
                    </span>
                  </div>
                </div>

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
                  <label className="col-md-2 col-form-label" htmlFor="username">
                    Username
                  </label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.usernameError && "is-invalid"
                      }`}
                      name="username"
                      id="username"
                      value={user.username}
                      onChange={(e) => validation(e)}
                    />
                    <span className="invalid-feedback text-start">
                      {errors.usernameError}
                    </span>
                  </div>
                </div>

                <div className="form-group row mb-2">
                  <label className="col-md-2 col-form-label" htmlFor="password">
                    Password
                  </label>
                  <div className="col-md-8">
                    <div className="input-group">
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

                <div className="form-group row mb-2">
                  <label
                    className="col-md-2 col-form-label"
                    htmlFor="confirmpassword"
                  >
                    Confirm Password
                  </label>
                  <div className="col-md-8">
                    <input
                      type="password"
                      className={`form-control ${
                        errors.confirmpasswordError && "is-invalid"
                      }`}
                      name="confirmpassword"
                      id="confirmpassword"
                      value={user.confirmpassword}
                      onChange={(e) => validation(e)}
                    />
                    <span className="invalid-feedback text-start">
                      {errors.confirmpasswordError}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success col-4"
                  disabled={
                    errors.nameError ||
                    errors.emailError ||
                    errors.usernameError ||
                    errors.passwordError ||
                    errors.confirmpasswordError

                    ///
                  }
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
