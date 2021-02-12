//import { results as testDataQuestions } from '../data/data.json';
import { AuthenticationResult } from '@azure/msal-browser';
import { authService } from '../services/auth-service';
import { Question } from './questions';

const questionPleaseApi = 'https://questionplease-api.azurewebsites.net/api/question';
//initial API : https://opentdb.com/api.php?amount=10&category=9&difficulty=easy'

interface ISerializedApiQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function getNextId(questionsArray: Array<Question>): number {
  if (questionsArray.length === 0) {
    return 1;
  }
  return 1 + Math.max(...questionsArray.map((p) => p.id));
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export async function loadTestDataFromApi(): Promise<Question[]> {
  let result = new Array<Question>();

  let dataFromApi: HttpResponse<ISerializedApiQuestion[]>;
  try {
    dataFromApi = await getQuestionsFromAPI<ISerializedApiQuestion[]>();
    console.log("response", dataFromApi);
  } catch (response) {
    console.log("Error", response);
    return new Array<Question>();
  }

  if (dataFromApi.parsedBody === undefined) {
    console.log("Undefined Parsed Body");
    return new Array<Question>();
  }

  dataFromApi.parsedBody.forEach((saq: ISerializedApiQuestion) => {
    const question = new Question(getNextId(result), saq.question, saq.correct_answer);
    result.push(question);
  });

  return result
}

export async function getQuestionsFromAPI<T>(): Promise<HttpResponse<T>> {

  //Pour faire un refresh silencieux si le token est expiré :
  //https://docs.microsoft.com/en-us/azure/app-service/app-service-authentication-how-to#refresh-identity-provider-tokens

  const headers = new Headers();
  const token = await authService.getTokenPopup();

  if (!token) {
    throw new Error("Undefined Token");
  }

  const bearer = `Bearer ${token.accessToken}`;
  headers.append("Authorization", bearer);

  var options = {
    method: "GET",
    headers: headers
  };

  const response: HttpResponse<T> = await fetch(questionPleaseApi, options);

  try {
    response.parsedBody = await response.json();
  } catch (ex) { }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}
