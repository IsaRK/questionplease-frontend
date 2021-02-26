import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { AnswerForm } from "./AnswerForm";
import Leaderboard from "./Leaderboard";
import { QuestionComputer } from "./QuestionComputer";
import SignOutButton from "./SignOutButton";

export const Play: React.FC = () => {
  const isLogged = useSelector((state: RootState) => state.loginState.IsLogged);
  const identity = useSelector((state: RootState) => state.loginState.Identity);

  return (
    <div>
      <div>
        {isLogged ? <label>{"Welcome " + identity?.login}</label> : <div />}
      </div>
      <SignOutButton />
      <QuestionComputer />
      <AnswerForm />
      <Leaderboard />
    </div>
  );
};
