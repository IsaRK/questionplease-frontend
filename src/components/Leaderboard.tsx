import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
//import { DataGrid } from '@material-ui/data-grid';
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";

export const Leaderboard: React.FunctionComponent = () => {
  const currentUserScore = useSelector(
    (state: RootState) => state.loginState.Score
  );
  const topUsers = useSelector(
    (state: RootState) => state.leaderboardState.TopUsers
  );
  const playWithoutLogin = useSelector(
    (state: RootState) => state.loginState.PlayWithoutLogin
  );

  if (topUsers.length === 0) {
    return <div />;
  }

  const scoreLabel = playWithoutLogin ? "current streak" : "total score";

  return (
    <Box mt={5} ml={3} mr={3}>
      <Grid
        spacing={10}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Box
            pb={3}
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <Typography variant="subtitle1">
              {"Your " + scoreLabel + " : " + currentUserScore}
            </Typography>
          </Box>
        </Grid>
        <Grid item style={{ height: 400 }}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Login</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topUsers.map((userScore, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell>{userScore.login}</TableCell>
                    <TableCell>{userScore.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Leaderboard;
