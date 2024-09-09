import { useState } from "react";

import {
  EditOutlined,
  DeleteOutlined,
  GifBoxOutlined,
  ImageOutlined,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import Dropzone from "react-dropzone";
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";
import { setPosts } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";
import { SERVER_URL } from "../../service/config";

import { postSchema } from "../../utils/Schemas";
import {ToastContainer, toast} from "react-toastify";

const MyPostWidget = ({ profilePhotoUrl }) => {
  const dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState([]);
  const [errors, setErrors] = useState({});
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { username } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { mediumMain, medium } = palette.neutral;

  const handleDrop = (acceptedFiles) => {
    acceptedFiles = acceptedFiles.slice(0, isNonMobileScreens ? 5 : 4);

    setImageUrls(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );

    setImage(acceptedFiles);
  };

  const handlePost = async (e) => {
    try {
      const formData = new FormData();
    formData.append("username", username);
    formData.append("caption", post);

    if (imageUrls) {
      imageUrls.forEach((image) => {
        formData.append("postImageUrls", image);
      });
    }

    const response = await fetch(SERVER_URL + "p", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();

    setLoading(false);

    dispatch(setPosts({ posts }));
    setImageUrls([]);
    setImage(null);
    setPost("");
    toast.success("Post added")
    } catch (err) {
      toast.success("Something went wrong, please try again later !")
      setLoading(false);
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await postSchema.validate(
        { caption: post, images: imageUrls },
        { abortEarly: false }
      );
      setErrors({});
      handlePost();
    } catch (err) {
      console.log("error detected");
      setLoading(false);
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  const handleBlur = async () => {
    setErrors({});
  };

  const handleChange = async (e) => {
    setPost(e.target.value);
    if (post.length > 2) {
      try {
        await postSchema.validate(
          { caption: post, images: imageUrls },
          { abortEarly: false }
        );
        setErrors({});
      } catch (err) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
      return;
    }
  };

  return (
    <WidgetWrapper m="0 0 2rem 0" sx={{ textAlign: "center",width: {
      xs: "90%", sm: "100%"
      }, margin: "0 auto", marginBottom: "10px"}}>
      <ToastContainer />
      <FlexBetween gap="1.5rem">
        <UserAvatar image={(profilePhotoUrl.length > 0) ? profilePhotoUrl[0].url : 'https://i.stack.imgur.com/l60Hf.png'} />
        <InputBase
          placeholder="What's on your mind ?"
          onChange={handleChange}
          onBlur={handleBlur}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {errors.caption && (
        <Typography sx={{ fontSize: "0.69rem" }} variant="small" color="error">
          {errors.caption}
        </Typography>
      )}
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={true}
            onDrop={handleDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={
                    errors.images
                      ? `2px dashed red`
                      : `2px dashed ${palette.primary.main}`
                  }
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input onBlur={handleBlur} {...getInputProps()} />
                  {!image ? (
                    <p>Add Images Here</p>
                  ) : (
                    <FlexBetween>
                      <FlexBetween>
                        {imageUrls.map((img) => (
                          <img
                            width="70rem"
                            height="70rem"
                            style={{
                              margin: "0 0.25rem",
                              border: `0.2rem solid ${palette.primary.dark}`,
                            }}
                            src={img.preview}
                            alt={img.name}
                            key={img.preview}
                          />
                        ))}
                      </FlexBetween>

                      <IconButton>
                        <EditOutlined />
                      </IconButton>
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
          {errors.images && (
            <Typography sx={{ fontSize: "0.69rem" }} color="error">
              {errors.images}
            </Typography>
          )}
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={{ mediumMain }}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
          <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
          </FlexBetween>
        </FlexBetween>

        <Button
          disabled={loading || !post}
          onClick={handleSubmit}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          {loading ? (
            <CircularProgress sx={{ color: palette.neutral.dark }} size={15} />
          ) : (
            "Post"
          )}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
