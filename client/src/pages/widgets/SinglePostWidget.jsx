import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import { fToNow } from "../../utils/formatDate";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import {
  Box, IconButton, Typography, useMediaQuery, useTheme
} from "@mui/material";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import Following from "../../components/Following";
import LikeBox from "../../components/LikeBox";
import CommentBox from "../../components/Comment/Comment";
import { SERVER_URL } from "../../service/config";
import { useEffect } from "react";
import { fShortenNumber } from "../../utils/formatNumber";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useNavigate } from 'react-router-dom';


const SinglePostWidget = ({
  postId,
  postUserId,
  postAuthorUsername,
  location,
  caption,
  postImageUrls,
  userProfilePhoto,
  likes,
  createdAt,
  commentCount,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [likeData, setLikeData] = useState(null);
  const [isLongCaption, setIsLongCaption] = useState(false);
  const theme = useTheme()
  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const imageHeight = isNonMobileScreens ? "450px" : "300px";

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { username } = useSelector((state) => state.user);
  const isLiked = Boolean(likes[username]);
  const likeCount = Object.keys(likes).length;
  const isAuthor = postAuthorUsername === username;

  const { palette } = useTheme();
  const { dark } = palette.primary;
  const { main, medium } = palette.neutral;

  const addRemoveLike = async () => {
    const response = await fetch(SERVER_URL + `p/${postId}/likes`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    getLikes();
  };

  const getLikes = async () => {
    if (likeCount > 0) {
      const response = await fetch(SERVER_URL + `p/${postId}/likes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const likeData = await response.json();
        setLikeData(likeData);
      }
    }
  };

  const handleCommentToggle = () => {
    setIsComments(!isComments);
  };

  const handleCaptionToggle = () => {
    setIsLongCaption(!isLongCaption);
  };

  const handleClickOpen = (newRating) => {
    navigate(`/review/${postId}`);
  };



  useEffect(() => {
    getLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      m="0 0 2rem 0"
      sx={{
        maxWidth: "650px",
        backgroundColor: palette.background.alt,
        borderRadius: "0.75rem",
        padding: isNonMobileScreens
          ? "1.5rem 1.5rem 0.75rem 1.5rem"
          : "1.5rem 0",
        width: {
          xs: "90%", // Full width on extra-small screens (mobile)
          sm: "100%"
        },
        margin: "0 auto", // Center the box horizontally
        marginBottom: "10px"
      
      }}
    >
      <Box sx={{ padding: !isNonMobileScreens ? "0 0.75rem" : "" }}>
        <Following
          followingId={postUserId}
          name={postAuthorUsername}
          subtitle={location}
          userProfilePhotoUrl={userProfilePhoto}
          postId={postId}
          isAuthor={isAuthor}
        />

        {/* post caption  */}
        <Typography color={main} sx={{ mt: "1rem" }}>
          {caption.length > 100
            ? isLongCaption
              ? caption
              : `${caption.substring(0, 100)}...`
            : caption}
        </Typography>

        {caption.length > 100 ? (
          <Typography
            onClick={handleCaptionToggle}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: palette.light,
              },
            }}
            color={medium}
          >
            {isLongCaption ? "View less" : "view More"}
          </Typography>
        ) : null}
      </Box>

      {postImageUrls.length ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          {postImageUrls.length > 0 && (
            <Swiper modules={[Pagination, Navigation]} spaceBetween={40} slidesPerView={1} pagination={{ clickable: true }} navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}>
              {postImageUrls.map(({ url, filename }) => (
                <SwiperSlide key={uuidv4()}>
                  <Box>
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={url}
                        alt={filename}
                        style={{
                          borderRadius: isNonMobileScreens ? "0.75rem" : "0",
                          marginTop: "0.75rem",
                          height: imageHeight,
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}

              <Box className="swiper-button-prev" style={{ color: "#14b3c1" }}></Box>
              <Box className="swiper-button-next" style={{ color: "#14b3c1" }}></Box>
            </Swiper>
          )}
        </Box>
      ) : null}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={addRemoveLike}>
              {isLiked ? <FavoriteOutlined sx={{ color: dark }} /> : <FavoriteBorderOutlined />}
            </IconButton>
            <Typography>{fShortenNumber(likeCount) || 0}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ReviewsIcon />
            </IconButton>
            <Typography>{fShortenNumber(commentCount) || 0}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* Star Rating */}
        <FlexBetween>
          <Box sx={{ display: "flex", justifyContent: "center", borderRadius: "30px", border: "1px solid",borderColor: theme.palette.background.light, paddingRight: "5px", paddingLeft: "5px", gap: "5px"}}>
            

          <Typography onClick={handleClickOpen} color={theme.palette.background.light} sx={{ m: "0.2rem", fontWeight: 600, fontSize: "11px", cursor: "pointer" }}>
            Send your Feedback
          </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Box sx={{ padding: !isNonMobileScreens ? "0 0.75rem" : "" }}>
        {/* Liked By */}
        {likeData ? <LikeBox likes={likeData} likeCount={likeCount} /> : null}

        {commentCount ? (
          <Typography
            onClick={handleCommentToggle}
            sx={{
              cursor: "pointer",
              mb: "1rem",
              "&:hover": {
                color: palette.background.light,
              },
            }}
            color={medium}
          >
            {!isComments
              ? `View ${
                  commentCount > 1
                    ? `all ${commentCount} comments`
                    : `${commentCount} comment`
                }`
              : "Hide comments"}
          </Typography>
        ) : null}

        <Typography fontWeight="200" fontSize="0.79rem" marginBottom="1rem">
          Posted {fToNow(createdAt)}
        </Typography>
      </Box>

      {isComments && (
        <CommentBox
          postId={postId}
          commentCount={commentCount}
          isNonMobileScreens={isNonMobileScreens}
        />
      )}
    </Box>
  );
};

export default SinglePostWidget;
