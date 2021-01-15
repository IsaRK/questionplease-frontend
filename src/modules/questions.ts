
import { results as testDataQuestions } from '../data/data.json';
import * as actionTypes from "./actionTypes"

type QuestionsState = {
    Questions : Question[] | null
    SelectedQuestion : Question | null
};


const initialQuestionsState: QuestionsState = { Questions: null, SelectedQuestion: null };

/*
export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

export const logout = () => {
  return typedAction("user/LOGOUT");
};
*/

//Ceci est un action creator : function qui retourn une action.
//Un action est un object simple qui contient une propriété "type"
export const selectAllQuestionsAction = () => ({
  type: actionTypes.QUESTIONS_READALL
});

export const selectRandomQuestionAction = () => ({
    type: actionTypes.QUESTIONS_SELECTRANDOM
});

type QuestionsAction = ReturnType<typeof selectAllQuestionsAction | typeof selectRandomQuestionAction>;

export function loadTestData(): Array<Question> {
  let result = new Array<Question>();
  testDataQuestions
      .forEach((saq: ISerializedApiQuestion) => {
          const question = new Question(getNextId(result), saq.question, saq.correct_answer);
          result.push(question);
      });
  return result;
}

//Le reducer est une function pure :
//Sa valeur de retour est la même pour les mêmes arguments :
//  pas de variation avec des variables statiques locales, des variables non locales, 
//  des arguments mutables de type référence ou des flux d'entrée
//Son évaluation n'a pas d'effets de bord  :
//  pas de mutation de variables statiques locales, de variables non locales, 
//  d'arguments mutables de type référence ou de flux d'entrée-sortie
export function questionsReducer(
  state = initialQuestionsState,
  action: QuestionsAction
): QuestionsState {
  switch (action.type) {
    case actionTypes.QUESTIONS_READALL:
      return {
        ...state,
        Questions: loadTestData(),
      };
    case actionTypes.QUESTIONS_SELECTRANDOM:
      return {
        ...state,
        SelectedQuestion: selectRandomQuestion(state.Questions),
      };
    default:
      return state;
  }
}

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

interface ISerializedApiQuestion {
  category: string;
  type: string;
  difficulty: string;
  question : string;
  correct_answer : string;
  incorrect_answers : string[];
}

function getNextId(questionsArray:Array<Question>): number {
  if (questionsArray.length === 0) {
      return 1;
  }
  return 1 + Math.max(...questionsArray.map((p) => p.id));
}

export function selectRandomQuestion(questionsArray:Array<Question>|null): Question|null {
  if (questionsArray === null)
  {
    questionsArray = loadTestData();
  }

  var max = questionsArray.length;
  var randomIndex = Math.floor(Math.random() * (max + 1));
  let result = questionsArray[randomIndex];
  console.log("Selected Question is" + result.toString());
  return result;
}