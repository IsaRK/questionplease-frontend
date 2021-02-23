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

  const listItems = topUsers.map((userScore, index) => (
    <li key={index}>{userScore.toString()}</li>
  ));

  if (topUsers.length === 0) {
    return <div />;
  }

  const scoreLabel = playWithoutLogin ? "current streak" : "total score";

  return (
    <div>
      <div>{"Your " + scoreLabel + " : " + currentUserScore}</div>
      <ul>{listItems}</ul>
    </div>
  );
};

export default Leaderboard;
