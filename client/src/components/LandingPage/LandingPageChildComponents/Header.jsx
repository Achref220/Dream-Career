"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "@mui/material";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Use 'md' for medium devices
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#00CDE1" }}>
        <Toolbar
          sx={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left Side - Logo */}
          <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
            <img width={48} height={48} src="/assets/logo.svg" alt="Logo" />
          </Box>

          {/* Right Side - Buttons or Menu Icon */}
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Link
                href="#about"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  px: 2,
                  py: 1,
                }}
              >
                About Us
              </Link>
              <Link
                href="#contact"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  px: 2,
                  py: 1,
                }}
              >
                Contact
              </Link>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  borderRadius: "12px",
                  padding: "12px 24px",
                  "&:hover": { borderColor: "#fff" },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "12px",
                  padding: "12px 24px",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Box>
          ) : (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile View */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: "#00CDE1" }, // Match the header color
        }}
      >
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Close Button */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(false)}
            sx={{ alignSelf: "flex-end", m: 2, color: "white" }}
          >
            <CloseIcon />
          </IconButton>

          {/* Drawer Content */}
          <List sx={{ flexGrow: 1 }} className="flex flex-col gap-[10px]">
            <ListItem disablePadding className="w-fit mx-auto">
              <ListItemButton
                component="a"
                href="#about"
                sx={{
                  textAlign: "center",
                  padding: "6px 24px",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              >
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className="w-fit mx-auto">
              <ListItemButton
                component="a"
                href="#contact"
                sx={{
                  textAlign: "center",
                  padding: "6px 24px",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              >
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding className="w-fit mx-auto">
              <ListItemButton
                component="a"
                sx={{
                  textAlign: "center",
                  padding: "7px 24px",
                  borderRadius: "12px",
                  border: "1px solid #2E2E2E",
                  color: "#fff",
                }}
                onClick={() => navigate("/login")}
              >
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className="w-fit mx-auto">
              <ListItemButton
                component="a"
                sx={{
                  textAlign: "center",
                  padding: "7px 24px",
                  borderRadius: "12px",
                  backgroundColor: "white",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#f7feff", // Lighter blue on hover
                  },
                }}
                onClick={() => navigate("/register")}
              >
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
