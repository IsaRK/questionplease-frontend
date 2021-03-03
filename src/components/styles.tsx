import { css } from "@emotion/react";
import { createMuiTheme, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  clickeable: {
    background: "white",
    border: "2px black",
    borderRadius: 50,
    color: "black",
  },
  navbar: {
    background:
      "linear-gradient(45deg, rgba(255,255,255,1) 0%,rgba(255,255,255,1) 50%,rgba(10,14,10,1) 50%,rgba(10,8,9,1) 100%)" /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */,
    boxShadow: "0 0px 0px 0px rgba(255, 255, 255, 0)",
    color: "white",
  },
  navbarLink: {
    color: "inherit",
  },
  leaderboard: {
    border: "solid",
    padding: "15px",
    borderWidth: "2px",
    borderRadius: 0,
    borderColor: "black",
    width: "max-content",
  },
  tooltip: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "black",
    fontSize: 11,
  },
});

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: ['"Montserrat", sans-serif'].join(","),
    h6: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h2: {
      color: "white",
      fontFamily: '"Shrikhand", cursive',
      "-webkit-text-stroke": "3px black",
    },
    h5: {
      color: "black",
      fontFamily: '"Shrikhand", cursive',
    },
  },
});

export const spinnerStyle = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;
