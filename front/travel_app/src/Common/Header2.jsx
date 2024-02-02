import * as React from "react";
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
import { Grid, Link, makeStyles } from "@mui/material";

const drawerWidth = 240;
const navItems = ["会員登録", "ログイン", "SAMURAI Travelとは"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
        {navItems.map((item) => (
          // 条件によってDrawerに表示するかどうかを制御
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // const useStyles = makeStyles(() => ({
  //   "@media ()"
  // }));

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
          // background: "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.2))",
          backgroundColor: '#fff',
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
                <Link
                  href="#"
                  style={{ color: "black", textDecoration: "none" }}
                >
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
              my={3}
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "block" },
                fontSize: 25,
                textShadow: "3px 4px 3px rgb(61 70 70)",
              }}
            >
              <Link href="#" style={{ color: "rgb(39, 74, 143)", textDecoration: "none" }}>
                SAMURAI Travel
              </Link>
            </Typography>

            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: "#fff",
                    fontSize: 15,
                    textShadow: "3px 4px 3px rgb(61 70 70)",
                  }}
                >
                  {item}
                </Button>
              ))}
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
            display: { xs: "block", sm: "none" },
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
