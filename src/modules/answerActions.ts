import {actionTypes} from "./actionTypes"

export type AnswerAction =
  | { type: actionTypes.ANSWER_VALIDATE; userAnswer : string }
  | { type: actionTypes.ANSWER_NEXTQUESTION }
  | { type: actionTypes.ANSWER_RETRY }

export function validateAnswerAction(userAnswer:string) : AnswerAction {
    return {
        type: actionTypes.ANSWER_VALIDATE,
        userAnswer: userAnswer
    }
}

export const nextQuestionAnswerAction = {
    type: actionTypes.ANSWER_NEXTQUESTION
}

export const retryAnswerAction =  {
    type: actionTypes.ANSWER_RETRY,
}

export function validateAnswer(answer:string | undefined, currentAnswer:string):boolean
{
    let isCorrect = answer === currentAnswer;
    console.log(isCorrect)
    return isCorrect;
}

