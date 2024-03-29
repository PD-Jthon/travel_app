import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoggedInState } from "../Atom/atom";
import { useAlert } from "../Alert/Alert";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedInState);
  const { alert, hideAlert, setAlert } = useAlert();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const svg_icons = {
    transform: "scale(1.5)",
  };

  useEffect(() => {
    const signUpBtn = document.querySelector(".sign-up");
    if (isLoggedIn && signUpBtn) {
      signUpBtn.remove();
    }
  }, [isLoggedIn]);

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
        {isLoggedIn && (
          <>
            <ListItem
              key="Login"
              disablePadding
              sx={{ justifyContent: "center" }}
            >
              <ListItemButton onClick={() => handleLogOut()}>
                <ListItemText
                  style={{ justifyContent: "center", display: "flex" }}
                  primary="ログアウト"
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              key="Login"
              disablePadding
              sx={{ justifyContent: "center" }}
            >
              <ListItemButton
                style={{ justifyContent: "center", display: "flex" }}
              >
                <Link
                  to={`reservation`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ListItemText
                    style={{ justifyContent: "center", display: "flex" }}
                    primary="予約一覧"
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}
        {!isLoggedIn && (
          <>
            <ListItem key="signUp" disablePadding>
              <ListItemButton sx={{ justifyContent: "center" }}>
                <Link
                  to={`sign_up/`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary="会員登録" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key="Login" disablePadding>
              <ListItemButton sx={{ justifyContent: "center" }}>
                <Link
                  to={`login/`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary="ログイン" />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}

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

  const handleLogOut = () => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/dj-rest-auth/logout`,
      method: "GET",
      withCredentials: true,
    })
      .then(() => {
        localStorage.removeItem("token");
        document.cookie = "token=; max-age=0";
        console.log(document.cookie);
        setLoggedIn(false);
        setAlert({ severity: "success", message: "ログアウトしました。" });
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        zIndex: "9",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <AppBar
        component="nav"
        sx={{
          background: "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.2))",
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
              {isLoggedIn ? (
                <>
                  <Button
                    key="logOut"
                    id="logout"
                    sx={{
                      color: "#fff",
                      fontSize: 15,
                      textShadow: "3px 4px 3px rgb(61 70 70)",
                    }}
                    onClick={() => handleLogOut()}
                  >
                    ログアウト
                  </Button>
                  <Link
                    to={`reservation`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <Button
                      key="logOut"
                      id="logout"
                      sx={{
                        color: "#fff",
                        fontSize: 15,
                        textShadow: "3px 4px 3px rgb(61 70 70)",
                      }}
                    >
                      予約一覧
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
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
                      className="sign-up"
                    >
                      会員登録
                    </Link>
                  </Button>
                  <Button
                    key=""
                    sx={{
                      color: "#fff",
                      fontSize: 15,
                      textShadow: "3px 4px 3px rgb(61 70 70)",
                    }}
                  >
                    <Link
                      to={`login/`}
                      style={{ color: "#fff", textDecoration: "none" }}
                    >
                      ログイン
                    </Link>
                  </Button>
                </>
              )}

              <Button
                key=""
                sx={{
                  color: "#fff",
                  fontSize: 15,
                  textShadow: "3px 4px 3px rgb(61 70 70)",
                }}
              >
                <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                  SAMURAI Travelとは
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
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
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
