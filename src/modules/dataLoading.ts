import { Question } from "./questions";
import { results as testDataQuestions } from '../data/data.json';

interface IApiResponse
{
  results:ISerializedApiQuestion[]
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

interface HttpResponse<T> extends Response {
    parsedBody?: T;
  }

  export function loadTestData(): Array<Question> {
    let result = new Array<Question>();
    testDataQuestions
        .forEach((saq: ISerializedApiQuestion) => {
            const question = new Question(getNextId(result), saq.question, saq.correct_answer);
            result.push(question);
        });
    return result;
  }
  
  export async function loadTestDataFromApi(): Promise<Question[]> {
    let result = new Array<Question>();
  
    let dataFromApi : HttpResponse<IApiResponse>;
    try {
      dataFromApi = await getQuestionsFromAPI<IApiResponse>(
        'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy'
      );
      console.log("response", dataFromApi);
    } catch (response) {
      console.log("Error", response);
      return new Array<Question>();
    }
  
    if (dataFromApi.parsedBody === undefined)
    {
      console.log("Undefined Parsed Body");
      return new Array<Question>();
    }
  
    dataFromApi.parsedBody.results.forEach((saq: ISerializedApiQuestion) => {
            const question = new Question(getNextId(result), saq.question, saq.correct_answer);
            result.push(question);
        });
    
    return result
  }
  
  export async function getQuestionsFromAPI<T>(
    request: RequestInfo
  ): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(
      request
    );
  
    try {
      // may error if there is no body
      response.parsedBody = await response.json();
    } catch (ex) {}
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }
  