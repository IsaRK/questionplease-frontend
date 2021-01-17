import { Console } from "console";
import { loadTestData } from "./dataLoading";

export type QuestionsState = {
    Questions : Question[] | null
    SelectedQuestion : Question | null
};

export class Question  {
  constructor(id:number, interrogation: string, answer: string){
      this.id = id;
      this.interrogation = interrogation;
      this.answer = answer;
  }

  id: number;

  interrogation: string;

  answer: string;

  toString():string
  {
      return "[" + this.interrogation + " : " + this.answer + "]";
  }
}

export function selectRandomQuestion(questionsArray:Array<Question>|null): Question|null {
  if (questionsArray === null)
  {
    //Parce que je ne sais pas encore loader les data à l'initialisation
    //questionsArray = loadTestData();
    console.log("Error fetching data");
    return new Question(0, "Error Data", "");
  }

  var max = questionsArray.length;
  var randomIndex = Math.floor(Math.random() * (max + 1));
  let result = questionsArray[randomIndex];
  console.log("Selected Question is" + result.toString());
  return result;
}