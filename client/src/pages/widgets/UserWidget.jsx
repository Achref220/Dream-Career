import {
  EditOutlined,
  LinkedIn,
  LocationOnOutlined,
  ManageAccountsOutlined,
  Twitter,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Divider, Typography, useTheme } from "@mui/material";

//Custom components
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";

import UserWidgetSkeleton from "../../components/Skeletons/UserWidgetSkeleton";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SERVER_URL } from "../../service/config";
import { fShortenNumber } from "../../utils/formatNumber";

const UserWidget = ({ username, profilePhotoUrl }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();

  //state
  const token = useSelector((state) => state.token);
  const followings = useSelector((state) => state.user.followings);
  const followers = useSelector((state) => state.user.followers);

  //colors
  const theme = useTheme();
  const light = theme.palette.background.light;
  console.log(light);
  const getUser = async () => {
    const response = await fetch(SERVER_URL + `u/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await response.json();

    setUser(userData);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followings, followers]);

  if (!user) {
    return <UserWidgetSkeleton />;
  }

  const {
    location,
    occupation,
    viewedProfile,
    impressions,
    followerCount,
    followingCount,
  } = user;

  return (
    <WidgetWrapper style={{backgroundColor : light, color: "#ffff"}}>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween>
          <UserAvatar image={profilePhotoUrl} />
          <Box marginLeft="1rem">
            <Typography
              variant="h4"
              color={"#ffff"}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/profile")}
            >
              {username}
            </Typography>
            <FlexBetween paddingTop="0.4rem" width="11rem">
              <FlexBetween>
                <Typography color={"#ffff"} marginRight="0.25rem">
                  {fShortenNumber(followerCount) || 0}
                </Typography>
                <Typography color={"#ffff"}>
                  {followerCount === 1 ? "follower" : "followers"}
                </Typography>
              </FlexBetween>

              <FlexBetween>
                <Typography color={"#ffff"}>
                  {fShortenNumber(followingCount) || 0}
                </Typography>
                <Typography color={"#ffff"} marginLeft="0.25rem">
                  following
                </Typography>
              </FlexBetween>
            </FlexBetween>
          </Box>
        </FlexBetween>

        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: "#ffff" }} />
          <Typography color={"#ffff"}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: "#ffff" }} />
          <Typography color={"#ffff"}>{occupation}</Typography>
        </Box>
      </Box>

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={"#ffff"}>Who viewed your profile</Typography>
          <Typography color={"#ffff"} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography color={"#ffff"}>Impressions of your post</Typography>
          <Typography color={"#ffff"} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Box p="1rem 0">
        <Typography color={"#ffff"} marginBottom="0.7rem" fontWeight="500">
          Social Media Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              <Typography color={"#ffff"} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={"#ffff"}>Social Media</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: "#ffff" }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedIn />
            <Box>
              <Typography color={"#ffff"} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={"#ffff"}>Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: "#ffff" }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
