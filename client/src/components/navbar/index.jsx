import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";

import {
  Textsms,
  LightMode,
  DarkMode,
  Notifications,
  Help,
  Menu,
  Close,
  Leaderboard,
} from "@mui/icons-material";

import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../CustomStyledComponents/FlexBetween";

import AccountMenu from "../AccountMenu";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, profilePhotoUrl } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.light;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuToggled(!isMobileMenuToggled);
  };

  const handleModeChange = () => {
    dispatch(setMode());
  };

  return (
    <header
      style={{
        width: "100%",
        height: "100%",
        paddingBottom: "5rem",
        zIndex: "55",
        boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5)",
        backgroundColor: theme.palette.background.light,
        position: "relative",
      }}
    >
      <FlexBetween
        padding="1rem 6%"
        backgroundColor={alt}
        sx={{ position: "fixed", width: "100%" }}
      >
        <FlexBetween gap="1.75rem">
        <div style={{display: "flex"}}>
        <img onClick={() => navigate("/")} width={"50px"} src="/assets/logo png.png" alt="rt" />
          <Typography
            
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="#ffff"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            Dreaca
          </Typography>
        </div>
          {isNonMobileScreens && <SearchBar />}
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: "#FFFF", fontSize: "25px" }} />
              )}
            </IconButton>

            <IconButton onClick={() => navigate("/direct/inbox")}>
              {theme.palette.mode === "dark" ? (
                <Textsms sx={{ fontSize: "25px" }} />
              ) : (
                <Textsms sx={{ fontSize: "25px", color: "#FFFF" }} />
              )}
            </IconButton>
            
            <Tooltip title="Club Leaderboard" arrow>
            <IconButton>
              {theme.palette.mode === "dark" ? (
                <Leaderboard sx={{ fontSize: "25px" }} />
              ) : (
                <Leaderboard sx={{ fontSize: "25px", color: "#FFFF" }} />
              )}
            </IconButton>
            </Tooltip>
            
            <Notifications sx={{ fontSize: "25px" , color : "#FFFF"}} />
            <Help sx={{ fontSize: "25px" , color: "#FFFF"}} />
            <AccountMenu
              username={username}
              profilePhotoUrl={profilePhotoUrl[0]?.url ? profilePhotoUrl[0].url : 'https://i.stack.imgur.com/l60Hf.png'}
            />
          </FlexBetween>
        ) : (
          <IconButton onClick={handleMobileMenuToggle}>
            <Menu />
          </IconButton>
        )}

        {/**====================MOBILE SCREENS================================ */}

        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton onClick={handleMobileMenuToggle}>
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="2rem"
            >
              <AccountMenu
                username={username}
                profilePhotoUrl={profilePhotoUrl}
              />
              <IconButton onClick={handleModeChange} sx={{ fontSize: "25px" }}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <IconButton onClick={() => navigate("/direct/inbox")}>
                {theme.palette.mode === "dark" ? (
                  <Textsms sx={{ fontSize: "25px" }} />
                ) : (
                  <Textsms sx={{ fontSize: "25px", color: dark }} />
                )}
              </IconButton>
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </header>
  );
};

export default Navbar;
