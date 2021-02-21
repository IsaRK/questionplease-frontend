import { combineReducers } from 'redux';
import { AnswerAction, answerActionTypes } from './answerActions';
import { LoginState } from '../models/identity';
import { loginAction, loginActionTypes } from './loginActions';
import { QuestionsState } from '../models/questions';
import { questionActionTypes, QuestionsAction } from './questionsActions';
import Leaderboard from '../components/Leaderboard';
import { LeaderboardState } from '../models/leaderboard';
import { leaderboardAction, leaderboardActionTypes } from './leaderboardActions';

const initialQuestionsState: QuestionsState = { SelectedQuestion: null, UserAnswerResult: null, IsValidAnswer: false, Points: 0 };
export type QuestionsActionType = QuestionsAction | AnswerAction;

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
    case questionActionTypes.QUESTIONS_GOTNEXTQUESTION:
      return {
        ...state,
        SelectedQuestion: action.nextQuestion,
      };
    case answerActionTypes.ANSWER_RIGHTANSWER:
      return {
        ...state,
        UserAnswerResult: action.userAnswer,
        Points: action.points,
        IsValidAnswer: true
      };
    case answerActionTypes.ANSWER_WRONGANSWER:
      return {
        ...state,
        UserAnswerResult: action.userAnswer,
        IsValidAnswer: false
      };
    case questionActionTypes.QUESTIONS_RETRY:
      return {
        ...state,
        UserAnswerResult: null
      };
    case questionActionTypes.QUESTIONS_ABANDON:
      return {
        ...state,
        IsValidAnswer: false,
        UserAnswerResult: null
      };
    default:
      return state;
  }
}

const initialLoginState: LoginState = { Identity: null, LastError: null, IsLogged: false, Score: 0 };

export function loginReducer(state = initialLoginState, action: loginAction): LoginState {
  switch (action.type) {
    case loginActionTypes.NETWORK_ERROR:
      return { ...state, LastError: action.error };
    case loginActionTypes.SIGNED_IN:
      return { ...state, Identity: action.identity };
    case loginActionTypes.SIGN_OUT:
      return { ...state, Identity: null };
    case loginActionTypes.LOGINSET:
      return { ...state, Identity: action.identity, IsLogged: true };
    case loginActionTypes.SCOREUPDATE:
      return { ...state, Score: action.newScore };
    default:
      return state;
  }
}

const initialLeaderboardState: LeaderboardState = { TopUsers: [], MinScore: 0 };

export function leaderboardReducer(state = initialLeaderboardState, action: leaderboardAction): LeaderboardState {
  switch (action.type) {
    case leaderboardActionTypes.LEADERBOARD_SET:
      return {
        ...state,
        TopUsers: action.topUsers,
        MinScore: action.minScore
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  questionsState: questionsReducer,
  loginState: loginReducer,
  leaderboardState: leaderboardReducer
});

export type RootState = ReturnType<typeof rootReducer>;