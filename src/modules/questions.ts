export type QuestionsState = {
  Questions: Question[] | null
  SelectedQuestion: Question | null
  AnswerResult: Boolean | null
};

export class Question {
  constructor(id: number, interrogation: string, answer: string) {
    this.id = id;
    this.interrogation = interrogation;
    this.answer = answer;
  }

  id: number;
  interrogation: string;
  answer: string;
  toString(): string {
    return "[" + this.interrogation + " : " + this.answer + "]";
  }
}

export function selectRandomQuestion(questionsArray: Array<Question> | null): Question | null {
  if (questionsArray === null) {
    console.log("Error fetching data");
    return null;
  }

  var randomIndex = Math.floor(Math.random() * questionsArray.length);
  let result = questionsArray[randomIndex];
  console.log("Selected Question is" + result.toString());
  return result;
}