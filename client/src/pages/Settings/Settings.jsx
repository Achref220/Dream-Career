import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Input,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../service/config";
import { Formik } from "formik";
import { useTheme } from "@emotion/react";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";
import { ToastContainer, toast } from "react-toastify";
import { updatePasswordSchema } from "../../utils/Schemas";
import {PhotoCamera} from "@mui/icons-material";

const Settings = () => {
  const [user, setUser] = useState();
  const [isSignedInUserprofile, setIsSignedInUserprofile] = useState(false);
  const { username: signedInUsername } = useSelector((state) => state.user);
  const { username } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const getUser = async () => {
    const targetUsername = username || signedInUsername;

    const response = await fetch(SERVER_URL + `u/${targetUsername}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
      setIsSignedInUserprofile(userData.username === signedInUsername);
      setUser(userData);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValuesUser = {
    profilePhotoUrl: user ? user.profilePhotoUrl : null,
    username: user ? user.username : null,
    email: user ? user.email : null,
    password: user ? user.password : null,
    location: user ? user.location : null,
    occupation: user ? user.occupation : null,
  };

  const initialValuesPassword = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [loadingUpdatePass, setLoadingUpdatePass] = useState(false);

  const handleUserInfoFormSubmit = async (values, { setSubmitting }) => {
    const updateUserProfileInfoUrl = `u/${signedInUsername}/updateUserInfo`;
    try {
      const response = await fetch(updateUserProfileInfoUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilePhotoUrl: values.profilePhotoUrl,
          username: values.username,
          location: values.location,
          email: values.email,
          occupation: values.occupation,
        }),
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const handlePasswordFormSubmit = async (values, { setSubmitting }) => {
    // Handle password settings form submission, update password
    setSubmitting(true);
    setLoadingUpdatePass(true);
    const updatePasswordUrl =
      SERVER_URL + `u/${signedInUsername}/update-password`;
    try {
      const response = await fetch(updatePasswordUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });
      setLoadingUpdatePass(false);
      return response.ok
        ? toast.success("Password has been updated !")
        : response.status === 401
        ? toast.error("Incorrect current password !")
        : response.status === 500
        ? toast.error("Something went wrong with our servers !")
        : null;
    } catch (error) {
      toast.error("Something went wrong with our servers !");
      console.log(error);
      setLoadingUpdatePass(false);
    }
    setLoadingUpdatePass(false);
    setSubmitting(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Additional handling logic if needed
  };

  return (
    <Box>
      <ToastContainer />
      <Navbar />
      <Typography
        fontWeight="bold"
        textAlign="center"
        paddingTop="1rem"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color={"primary"}
        sx={{
          "&:hover": {
            color: "grey",
            cursor: "pointer",
          },
        }}
      >
        User Settings
      </Typography>
      {user && isSignedInUserprofile ? (
        <Box
          display={isNonMobileScreens ? "flex" : "block"}
          flexDirection="row"
          gap={"50px"}
          width={"100%"}
        >
          <WidgetWrapper
            width={"50%"}
            padding="2rem 3%"
            display="flex"
            flexDirection="row"
            margin={"40px"}
          >
            <Formik
              initialValues={initialValuesUser}
              onSubmit={handleUserInfoFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    width={"100%"}
                    display="grid"
                    gap="30px"
                    padding="1.5rem"
                    gridTemplateColumns="repeat(4, minmax(0, 150px))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobileScreens ? undefined : "span 4",
                      },
                    }}
                  >
                    <UserAvatar image={selectedFile ? URL.createObjectURL(selectedFile) : null || user.profilePhotoUrl} />
                    <Input
                      accept="image/*"
                      id="image-upload"
                      multiple={false}
                      type="file"
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="image-upload">
                      <IconButton color="primary" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
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
                      label="Location"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.location}
                      name="location"
                      error={
                        Boolean(touched.location) && Boolean(errors.location)
                      }
                      helperText={touched.location && errors.location}
                      sx={{ gridColumn: "span 4" }}
                    />

                    <TextField
                      fullWidth
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
                      label="Occupation"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.occupation}
                      name="occupation"
                      error={
                        Boolean(touched.occupation) &&
                        Boolean(errors.occupation)
                      }
                      helperText={touched.occupation && errors.occupation}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box padding="0 1.5rem 1.5rem 1.5rem">
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0",
                        p: "0.8rem",
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.main },
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>

            {/* updated password */}
          </WidgetWrapper>
          <WidgetWrapper
            width={"50%"}
            padding="2rem 3%"
            display="flex"
            flexDirection="row"
            margin={"40px"}
          >
            <Formik
              initialValues={initialValuesPassword}
              onSubmit={handlePasswordFormSubmit}
              validationSchema={updatePasswordSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    padding="1.5rem"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobileScreens ? undefined : "span 4",
                      },
                    }}
                  >
                    <Typography
                      width={"100%"}
                      fontWeight="bold"
                      textAlign="center"
                      fontSize="17px"
                      sx={{
                        "&:hover": {
                          color: "grey",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Update Password
                    </Typography>
                    <TextField
                      label="Current password"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="currentPassword"
                      error={
                        Boolean(touched.currentPassword) &&
                        Boolean(errors.currentPassword)
                      }
                      helperText={
                        touched.currentPassword && errors.currentPassword
                      }
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="New password"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.newPassword}
                      name="newPassword"
                      error={
                        Boolean(touched.newPassword) &&
                        Boolean(errors.newPassword)
                      }
                      helperText={touched.newPassword && errors.newPassword}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Confirm new password"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmNewPassword}
                      name="confirmNewPassword"
                      error={
                        Boolean(touched.confirmNewPassword) &&
                        Boolean(errors.confirmNewPassword)
                      }
                      helperText={
                        touched.confirmNewPassword && errors.confirmNewPassword
                      }
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box padding="0 1.5rem 1.5rem 1.5rem">
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0",
                        p: "0.8rem",
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": "grey",
                      }}
                    >
                      {loadingUpdatePass ? (
                        <CircularProgress
                          sx={{
                            color: palette.neutral.dark,
                          }}
                          size={22}
                        />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </WidgetWrapper>
        </Box>
      ) : (
        <UserAvatar isLoading={true} />
      )}
    </Box>
  );
};

export default Settings;
