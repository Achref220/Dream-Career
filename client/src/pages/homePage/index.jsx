import Navbar from "../../components/navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FollowingListWidget from "../widgets/FollowingListWidget";
import AdWidget from "../widgets/AdWidget";
import Suggestions from "../widgets/Suggestions";

const HomePage = () => {
  // Detect if the screen width is above or below 1000px
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Retrieve username and profile photo from Redux state
  const { username, profilePhotoUrl } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"} // Adjust layout based on screen size
        gap="1.5rem"
        justifyContent={isNonMobileScreens ? "space-between" : "center"}
        alignItems={isNonMobileScreens ? "flex-start" : "center"} // Center items for small screens
      >
        {/* Suggestions */}
        {isNonMobileScreens && (
          <Box flexBasis="18%">
            <Suggestions username={username} />
          </Box>
        )}

        {/* Main Post Area */}
        <Box
          flexBasis={isNonMobileScreens ? "50%" : "100%"} // Adjust width for mobile and desktop
          mt={isNonMobileScreens ? undefined : "2rem"} // Add margin on mobile
        >
          <MyPostWidget profilePhotoUrl={profilePhotoUrl} />
          <PostsWidget username={username} />
        </Box>

        {/* Ad and Following Widgets */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdWidget />
            <Box m="2rem 0" />
            <FollowingListWidget username={username} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
