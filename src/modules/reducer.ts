import { combineReducers } from 'redux';
import * as actionTypes from "./actionTypes"
import { QuestionsState, selectRandomQuestion } from './questions';
import { loadTestData } from './dataLoading';
import { QuestionsActionType } from './questionsActions';

const initialQuestionsState: QuestionsState = { Questions: null, SelectedQuestion: null };

//Le reducer est une function pure :
//Sa valeur de retour est la même pour les mêmes arguments :
//  pas de variation avec des variables statiques locales, des variables non locales, 
//  des arguments mutables de type référence ou des flux d'entrée
//Son évaluation n'a pas d'effets de bord  :
//  pas de mutation de variables statiques locales, de variables non locales, 
//  d'arguments mutables de type référence ou de flux d'entrée-sortie
export function questionsReducer(
  state = initialQuestionsState,
  action: QuestionsActionType
): QuestionsState {
  switch (action.type) {
    case actionTypes.QUESTIONS_READALL:
      return {
        ...state,
        Questions: loadTestData(),
      };
    case actionTypes.QUESTIONS_GETQUESTIONSFROMAPI:
      return {
        ...state
      };
    case actionTypes.QUESTIONS_READANSWERSFROMAPI:
      return {
        ...state,
        Questions: action.questions
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

export const rootReducer = combineReducers({
  questionsState: questionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;