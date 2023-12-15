import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLogin, setPerson } from "../../state";

import { SERVER_URL } from "../../service/config";
import { loginSchema, registerSchema } from "../../utils/Schemas";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";
import { keyframes } from "@emotion/react";

import "./index.css";

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
};

const initialValuesLogin = {
  username: "",
  password: "",
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Form = () => {
  const location = useLocation().pathname.slice(1);
  const [pageType, setPageType] = useState(location); //To turn '/register' to 'register'
  const [loading, setLoading] = useState(false);

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  let isLogin = pageType === "login";
  let isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const { username, email, location, occupation, password } = values;
    setLoading(true);

    try {
      console.log(process.env.REACT_APP_ENV);
      const res = await fetch(SERVER_URL + "register", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          location,
          occupation,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(
          setLogin({
            user: data.newUser,
            token: data.token,
          })
        );
        dispatch(setPerson({ person: data.newUser }));
        onSubmitProps.resetForm();
        toast.success("Account created !!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      } else {
        toast.error("Something went wrong !!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onSubmitProps.setFieldError(data.field, data.errorMsg);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const login = async (values, onSubmitProps) => {
    setLoading(true);

    try {
      const { username, password } = values;

      const loggedInResponse = await fetch(SERVER_URL + "login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (loggedInResponse.ok) {
        const loggedIn = await loggedInResponse.json();

        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        console.log("loggedIn.user", loggedIn.user);
        dispatch(setPerson({ person: loggedIn.user }));
        toast.success(`Welcome back ${loggedIn.user.username}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      } else {
        toast.error("Incorret Credentials !!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      onSubmitProps.resetForm();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) await register(values, onSubmitProps);
    if (isLogin) await login(values, onSubmitProps);
  };

  return (
    <div
      className="login-bg"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          width: isNonMobile ? "50%" : "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#14b3c1",
        }}
      >
        <WidgetWrapper
          width={isNonMobile ? "500px" : "370px"}
          sx={{ borderRadius: "50px", animation: `${slideFromLeft} 1s ease-in-out` }}
          className="wdwrapper"
        >
          {!isNonMobile ? (
            <img
              onClick={() => navigate("/")}
              width={"200px"}
              className="logoimg"
              src="/assets/image_1.png"
              alt="logo"
            />
          ) : null}
          <ToastContainer />

          <Formik
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit} id="authForm">
                <Box
                  display="grid"
                  gap="30px"
                  padding="1.5rem"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  {isRegister && (
                    <>
                      <TextField
                        label="Email"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={
                          Boolean(touched.location) && Boolean(errors.location)
                        }
                        helperText={touched.location && errors.location}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        label="Occupation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="occupation"
                        error={
                          Boolean(touched.occupation) &&
                          Boolean(errors.occupation)
                        }
                        helperText={touched.occupation && errors.occupation}
                        sx={{ gridColumn: "span 4" }}
                      />
                    </>
                  )}

                  <TextField
                    label="Username"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={values.username}
                    name="username"
                    error={
                      Boolean(touched.username) && Boolean(errors.username)
                    }
                    helperText={touched.username && errors.username}
                    sx={{ gridColumn: "span 4" }}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>

                {/* BUTTONS */}
                <Box padding="0 1.5rem 1.5rem 1.5rem">
                  <Typography
                    textAlign={"start"}
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      navigate(isLogin ? "/register" : "/login");
                      resetForm();
                    }}
                    sx={{
                      textDecoration: "underline",
                      color: "#14b3c1",
                      "&:hover": {
                        cursor: "pointer",
                        color: palette.primary.dark,
                      },
                    }}
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up here."
                      : "Already have an account? Login here."}
                  </Typography>
                </Box>
              </form>
            )}
          </Formik>
        </WidgetWrapper>
        <Button
            form="authForm"
            className="login-btn"
            type="submit"
            disabled={loading}
            sx={{
              width: isNonMobile ? "350px" : "250px",
              m: "2rem 0",
              p: "0.8rem",
              backgroundColor: "#ffff",
              color: "#14b3c1",
              fontSize: "17px",
              animation: `${slideFromBottom} 1s ease-in-out`, // Apply the animation
              "&:hover": { color: "#14b3c1", backgroundColor: "#ffff" },
            }}
          >
          {loading ? (
            <CircularProgress
              sx={{
                color: palette.neutral.dark,
              }}
              size={22}
            />
          ) : isLogin ? (
            "LOGIN"
          ) : (
            "REGISTER"
          )}
        </Button>
        <Typography
          textAlign={"end"}
          sx={{
            position: "absolute",
            fontSize: "16px",
            fontWeight: "bald",
            bottom: "20px",
            color: "#ffff",
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.dark,
            },
          }}
        >
          © 2023-2024 Dreaca. All rights reserved.
        </Typography>
      </Box>
      {isNonMobile ? (
        <Box
          sx={{
            width: "50%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ animation: `${slideFromRight} 1s ease-in-out` }}>
          <img
            onClick={() => navigate("/")}
            width={"600px"}
            className="logoimg"
            src="/assets/image_1.png"
            alt="logo"
          />
          </Box>
          <Typography
            textAlign={"end"}
            sx={{
              position: "absolute",
              fontSize: "18px",
              bottom: "20px",
              color: "#14b3c1",
              animation: `${fadeIn} 1s ease-in-out`,
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.dark,
              },
            }}
          >
            Just dream on
          </Typography>
        </Box>
      ) : null}
    </div>
  );
};

export default Form;
