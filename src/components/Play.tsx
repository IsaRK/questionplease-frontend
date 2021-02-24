import React from "react";
import { AnswerForm } from "./AnswerForm";
import Leaderboard from "./Leaderboard";
import { QuestionComputer } from "./QuestionComputer";

export const Play: React.FC = () => {
  return (
    <div>
      <QuestionComputer />
      <AnswerForm />
      <Leaderboard />
    </div>
  );
};
