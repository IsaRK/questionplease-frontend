import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import Spinner from "./Spinner";
import { useStyles } from "./styles";

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

  const classes = useStyles();

  const loadingTopScores = topUsers.length === 0;

  const scoreLabel = playWithoutLogin ? "current streak" : "total score";

  return (
    <Box mt={5} ml={3} mr={3}>
      <Grid
        container
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
            <Typography variant="h6">
              {"Your " + scoreLabel + " : " + currentUserScore}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <TableContainer className={classes.leaderboard}>
            {loadingTopScores ? (
              <Grid item>
                <Spinner
                  isLoading={loadingTopScores}
                  label="Loading Top Scores"
                />
              </Grid>
            ) : (
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell width="20px">Rank</TableCell>
                    <TableCell>Login</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topUsers.map((userScore, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {userScore.rank}
                      </TableCell>
                      <TableCell>{userScore.login}</TableCell>
                      <TableCell>{userScore.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Leaderboard;
