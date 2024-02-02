import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./style.css";
import { Container } from "@mui/system";
import { Grid, makeStyles } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const drawerWidth = 240;
// const navItems = ["会員登録", "ログイン", "SAMURAI Travelとは"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [logIn, setLogIn] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const svg_icons = {
    transform: "scale(1.5)",
  };

  const shouldShowInDrawer = (item) => {
    // 会員登録とログインだけをハンバーガーメニューにしまわない条件を設定
    return item !== "会員登録" && item !== "ログイン";
  };

  const token = localStorage.getItem("token");
  console.log(token);

  // useEffect(() => {
  //   if(token) {
  //     setAuthenticated(true);
  //   } else {
  //     setAuthenticated(false);
  //   };
  // }, [isAutheticated])

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", display: { md: "block" } }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        SAMURAI Travel
      </Typography>
      <Divider />
      <List>
        {/* <ListItem key="signUp" disablePadding>
          <ListItemButton sx={{ justifyContent: "center" }}>
            <Link
              to={`sign_up/`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemText primary="会員登録" />
            </Link>
          </ListItemButton>
        </ListItem> */}

        <ListItem key="Login" disablePadding sx={{ justifyContent: "center" }}>
          <ListItemButton onClick={() => handleLogOut()}>
            <ListItemText
              style={{ justifyContent: "center", display: "flex" }}
              primary="ログアウト"
            />
          </ListItemButton>
        </ListItem>

        <ListItem key="" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="SAMURAI Travelとは" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // const useStyles = makeStyles(() => ({
  //   "@media ()"
  // }));

  const handleLogOut = () => {
    const token = localStorage.getItem("token");
    axios({
      url: "http://localhost:8000/dj-rest-auth/logout",
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   'Authorization': `Bearer ${token}`,
      // },
    })
      .then((res) => {
        // todo: alertメッセージ
        localStorage.removeItem("token");
      })
      .catch((error) => console.log(error));
    // localStorage.removeItem("token");
  };

  // console.log(localStorage);

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      {/* <FadeSlider /> */}
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.2))",
          // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <Container>
          <Toolbar style={{ padding: 0 }}>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{ display: { md: "none" } }}
            >
              <Typography
                variant="h6"
                component="div"
                my={2}
                sx={{
                  flexGrow: 1,
                  display: { md: "block" },

                  fontSize: 20,
                  textShadow: "3px 4px 3px rgb(61 70 70)",
                }}
              >
                <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                  SAMURAI Travel
                </Link>
              </Typography>
              {/* <Button
                sx={{
                  color: "#fff",
                  fontSize: 15,
                  textShadow: "3px 4px 3px rgb(61 70 70)",
                }}
              >
                会員登録
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  fontSize: 15,
                  textShadow: "3px 4px 3px rgb(61 70 70)",
                }}
              >
                ログイン
              </Button> */}
              <IconButton
                style={svg_icons}
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { lg: "none" }, margin: 0 }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Typography
              variant="h6"
              component="div"
              my={2}
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "block" },
                fontSize: 25,
                textShadow: "3px 4px 3px rgb(61 70 70)",
              }}
            >
              <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                SAMURAI Travel
              </Link>
            </Typography>

            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {/* <Button
                key=""
                sx={{
                  color: "#fff",
                  fontSize: 15,
                  textShadow: "3px 4px 3px rgb(61 70 70)",
                }}
              >
                <Link
                  to={`sign_up/`}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  会員登録
                </Link>
              </Button> */}

              <Button
                key=""
                sx={{
                  color: "#fff",
                  fontSize: 15,
                  textShadow: "3px 4px 3px rgb(61 70 70)",
                }}
                onClick={() => handleLogOut()}
              >
                ログアウト
              </Button>

              <Button
                key=""
                sx={{
                  color: "#fff",
                  fontSize: 15,
                  textShadow: "3px 4px 3px rgb(61 70 70)",
                }}
              >
                <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                  SAMURAI Travel
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            // zIndex: 1000,
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography></Typography>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
