import { useState } from "react";
import "./navbar.css";

import { Box, useTheme, useMediaQuery, Chip } from "@mui/material";

import {
  Textsms,
  LightMode,
  DarkMode,
  Leaderboard,
  Logout,
} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../CustomStyledComponents/FlexBetween";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.mode);
  const { palette } = useTheme();
  const grey = palette.grey;
  const isMobileScreen = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const alt = theme.palette.background.light;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const version = "v1.0.0";


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        paddingBottom: "5rem",
        zIndex: "999",
        boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5)",
        backgroundColor: theme.palette.background.light,
        position: "sticky",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FlexBetween
        padding="1rem 6%"
        backgroundColor={alt}
        sx={{
          position: "fixed",
          width: "100%",
          backgroundColor:
            mode === "dark" ? "black" : theme.palette.background.light,
        }}
      >
        <FlexBetween sx={{ justifyContent: "space-between", width: "100%" }}>
          {/* Left Section */}
          <div style={{ display: "flex" }}>
            <div>
              <img
                style={{ cursor: "pointer" }}
                width={"50px"}
                onClick={() => navigate("/")}
                className="vector"
                src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/inztzhvf3al-4%3A95?alt=media&token=15bd6259-97ed-40d1-a662-85d26bf4feda"
                alt="rt"
              />
              {!isMobileScreen && (
                <Tooltip title="Welcome to our beta app! Please keep in mind that we're still refining features and making improvements. You may encounter some unfinished functionalities, and we greatly appreciate your feedback and patience as we continue to enhance your experience!">
                  <Chip
                    label={`Beta ${" " + version}`}
                    color="secondary"
                    size="small"
                    sx={{
                      left: "50px",
                      fontWeight: "bold",
                      position: "absolute",
                    }}
                  />
                </Tooltip>
              )}
            </div>
          </div>
  
          {/* Center Section */}
          <FlexBetween sx={{ justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
            <SearchBar isMobileScreen={isMobileScreen} />
            <IconButton onClick={handleClick} sx={{ fontSize: "35px", marginLeft: "10px" }}>
              <MenuIcon
                sx={{
                  fontSize: "35px",
                  color: "#ffff",
                }}
              />
            </IconButton>
          </FlexBetween>
  
          {/* Right Section */}
          {/* Add other elements for the right section if needed */}
        </FlexBetween>
  
        {/* Menu Component */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{
            width: "100%",
          }}
          PaperProps={{
            elevation: 5,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* Menu Items */}
          <MenuItem
            sx={{
              width: "13rem",
              fontSize: "0.9rem",
              padding: "0.6rem 1rem",
            }}
            onClick={() => navigate("/")}
          >
            <ListItemIcon>
              <HomeIcon
                sx={{
                  marginRight: "1rem",
                  color: grey,
                  fontSize: "1.3rem",
                }}
              />
            </ListItemIcon>
            Home
          </MenuItem>
          <MenuItem
            sx={{
              width: "13rem",
              fontSize: "0.9rem",
              padding: "0.6rem 1rem",
            }}
            onClick={() => navigate("/profilePage")}
          >
            <ListItemIcon>
              <PersonOutlineIcon
                sx={{
                  marginRight: "1rem",
                  color: grey,
                  fontSize: "1.3rem",
                }}
              />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem
            sx={{
              width: "13rem",
              fontSize: "0.9rem",
              padding: "0.6rem 1rem",
            }}
            onClick={() => navigate("/direct/inbox")}
          >
            <ListItemIcon>
              <Textsms fontSize="medium" />
            </ListItemIcon>
            Messenger
          </MenuItem>
          <MenuItem
            sx={{
              width: "13rem",
              fontSize: "0.9rem",
              padding: "0.6rem 1rem",
            }}
            onClick={() => navigate("/calendar")}
          >
            <ListItemIcon>
              <CalendarMonthIcon fontSize="medium" />
            </ListItemIcon>
            Calendar
          </MenuItem>
          <MenuItem
            sx={{
              width: "13rem",
              fontSize: "0.9rem",
              padding: "0.6rem 1rem",
            }}
            onClick={() => navigate("/leaderboard")}
          >
            <ListItemIcon>
              <Leaderboard fontSize="medium" />
            </ListItemIcon>
            Club Leaderboard
          </MenuItem>
          <MenuItem
            sx={{
              width: "13rem",
              fontSize: "0.9rem",
              padding: "0.6rem 1rem",
            }}
            onClick={() => dispatch(setMode())}
          >
            <ListItemIcon>
              {theme.palette.mode === "dark" ? (
                <DarkMode fontSize="medium" />
              ) : (
                <LightMode fontSize="medium" />
              )}
            </ListItemIcon>
            Light/Dark Mode
          </MenuItem>
  
          <Divider />
          <MenuItem
            sx={{
              width: "13rem",
              fontSize: "0.9rem",
              padding: "0.6rem 1rem",
            }}
          >
            <ListItemIcon>
              <FlagIcon fontSize="medium" />
            </ListItemIcon>
            <a
              href="https://github.com/Achref220/Dream-Career/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              Report a Problem
            </a>
          </MenuItem>
          <MenuItem
            sx={{
              width: "13rem",
              fontSize: "0.9rem",
              padding: "0.6rem 1rem",
            }}
            onClick={() => navigate("/Settings")}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="medium" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </FlexBetween>
    </Box>
  );
  
  
  
};

export default Navbar;
