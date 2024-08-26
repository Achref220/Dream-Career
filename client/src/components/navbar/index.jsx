import { useState } from "react";
import './navbar.css'

import {
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";

import {
  Textsms,
  LightMode,
  DarkMode,
  Notifications,
  Help,
  Close,
  Leaderboard,
  Logout,
} from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../CustomStyledComponents/FlexBetween";

import AccountMenu from "../AccountMenu";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, profilePhotoUrl } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const  mode  = useSelector((state) => state.mode)
  const { palette } = useTheme();
  const grey = palette.grey;

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.light;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuToggled(!isMobileMenuToggled);
  };

  const handleModeChange = () => {
    dispatch(setMode());
  };

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
        justifyContent: "center"
      }}
    >
      <FlexBetween
        padding="1rem 6%"
        backgroundColor={alt}
        sx={{ position: "fixed", width: "100%", backgroundColor: mode === "dark" ? "black" : theme.palette.background.ligh}}
      >
        <FlexBetween gap="40rem">
        <div style={{display: "flex"}}>
        <img style={{cursor: "pointer"}} onClick={handleClick} width={"50px"} className="vector"  src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/inztzhvf3al-4%3A95?alt=media&token=15bd6259-97ed-40d1-a662-85d26bf4feda" alt="rt" />
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          width: "100%"
        }}
        PaperProps={{
          elevation: 5,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 50,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
           sx={{width: "13rem", fontSize: "0.9rem" ,padding: "0.6rem 1rem"}}
           onClick={() => navigate('/profilePage')}> 
           <ListItemIcon>        
             <PersonOutlineIcon sx={{  marginRight: "1rem", color : grey, fontSize: "1.3rem"}}/>
          </ListItemIcon>
           Profile
        </MenuItem>
        <MenuItem
           sx={{width: "13rem", fontSize: "0.9rem" ,padding: "0.6rem 1rem"}}
           onClick={() => navigate('/Saved')}
        > 
        <ListItemIcon>
          <BookmarkBorderIcon fontSize="medium" sx={{ marginRight: "1rem", color : grey }}/> 
        </ListItemIcon>
        Saved
        </MenuItem>
        <MenuItem
           sx={{width: "13rem", fontSize: "0.9rem" ,padding: "0.6rem 1rem"}}
           onClick={() => navigate('/Settings')} 
        >
          <ListItemIcon>
            <SettingsIcon fontSize="medium" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
           sx={{width: "13rem", fontSize: "0.9rem" ,padding: "0.6rem 1rem"}}
        >
          <ListItemIcon>
            <FlagIcon fontSize="medium" />
          </ListItemIcon>
          <a href="https://github.com/Achref220/Dream-Career/issues" target='_blanc' style={{color: "black"}}>
          Report Problem
          </a>
        </MenuItem>

        <Divider />
        <MenuItem onClick={() => dispatch(setLogout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
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
            <IconButton onClick={() => navigate("/leaderboard")}>
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
    </Box>
  );
};

export default Navbar;
