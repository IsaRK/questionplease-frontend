import { ISerializedApiQuestion } from "../services/questionService";

export type QuestionsState = {
  SelectedQuestion: Question | null
  UserAnswerResult: string | null
  IsValidAnswer: Boolean | null
  Points: Number
};

export class Question {
  constructor(apiQuestion: ISerializedApiQuestion) {
    this.id = Number(apiQuestion.id);
    this.interrogation = apiQuestion.question;
    this.answers = apiQuestion.answers;
  }

  id: number;
  interrogation: string;
  answers: string[];
}