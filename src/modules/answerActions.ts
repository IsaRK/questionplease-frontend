import {actionTypes} from "./actionTypes"

export interface AnswerAction {
    type: actionTypes.QUESTION_VALIDATE,
    userAnswer : string
}

export function validateAnswerAction(userAnswer:string) : AnswerAction {
    return {
        type: actionTypes.QUESTION_VALIDATE,
        userAnswer: userAnswer
    }
}

export function validateAnswer(answer:string | undefined, currentAnswer:string):boolean
{
    let isCorrect = answer === currentAnswer;
    console.log(isCorrect)
    return isCorrect;
}

