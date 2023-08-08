import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./DrawerComp";
import { NavLink } from "react-router-dom"; // Import NavLink

const Adminn = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                Shoppee
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                {/* Use NavLink for navigation */}
                <NavLink
                  to="/card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Tab label="Agents" />
                </NavLink>
                {/* Use NavLink for navigation */}
                <NavLink
                  to="/admingallery"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Tab label="Gallery" />
                </NavLink>
              </Tabs>
              {/* Use NavLink for navigation */}
             
              <Button sx={{ marginLeft: "10px" }} variant="contained">
                {/* Use NavLink for navigation */}
                <NavLink to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                  Logout
                </NavLink>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Adminn;
