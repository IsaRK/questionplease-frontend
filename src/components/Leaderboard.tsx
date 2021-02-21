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

  const listItems = topUsers.map((userScore) => (
    <li>{userScore.toString()}</li>
  ));

  if (topUsers.length === 0) {
    return <div />;
  }

  return (
    <div>
      <div>{"Your score : " + currentUserScore}</div>
      <ul>{listItems}</ul>
    </div>
  );
};

export default Leaderboard;
