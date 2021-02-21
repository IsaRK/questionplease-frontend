import { Question } from '../models/questions';
import { getOptions, getOptionsWithBody, HttpResponse } from '../services/serviceHelper';

//const questionPleaseApiUrl = 'http://localhost:7071/api/question/';
const questionPleaseApiUrl = 'https://questionplease-api.azurewebsites.net/api/question';
//initial API : https://opentdb.com/api.php?amount=10&category=9&difficulty=easy'

export interface ISerializedApiQuestion {
    id: string;
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface IAnswerValidationResult {
    isValid: boolean;
    points: number;
    newScore: number;
}

export interface IUserQuestionsLog {
    id: string,
    idUser: string,
    idQuestion: string,
    questionDone: boolean,
    questionPoint: number
}

class QuestionService {

    static extractQuestionResponse(response: HttpResponse<ISerializedApiQuestion>): Question {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        if (response.parsedBody === null || response.parsedBody === undefined) {
            throw new Error("Fetched ISerializedApiQuestion is undefined");
        }

        return new Question(response.parsedBody);
    }

    static async loadNextQuestion(): Promise<Question> {
        try {
            const options = await getOptions("GET");

            const response: HttpResponse<ISerializedApiQuestion> = await fetch(questionPleaseApiUrl, options);
            response.parsedBody = await response.json();
            return QuestionService.extractQuestionResponse(response);
        }
        catch (ex) {
            throw new Error("Error when fetching ISerializedApiQuestion");
        }
    }

    static async loadNextQuestionWithId(questionid: number): Promise<Question> {
        try {
            const options = await getOptions("GET");
            var completeUrl = questionPleaseApiUrl + "/" + questionid.toString();

            const response: HttpResponse<ISerializedApiQuestion> = await fetch(completeUrl, options);
            response.parsedBody = await response.json();
            return QuestionService.extractQuestionResponse(response);
        }
        catch (ex) {
            throw new Error("Error when fetching ISerializedApiQuestion");
        }
    }

    static async abandonQuestion(userId: string, questionId: number): Promise<IUserQuestionsLog> {
        try {
            var body = {
                userId: userId,
                questionId: questionId
            };

            const options = await getOptionsWithBody("POST", body);
            const response: HttpResponse<IUserQuestionsLog> = await fetch(questionPleaseApiUrl + "/abandon", options);
            response.parsedBody = await response.json();

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            if (response.parsedBody === null || response.parsedBody === undefined) {
                throw new Error("Fetched IUserQuestionsLog is undefined");
            }

            return response.parsedBody;
        }
        catch (ex) {
            throw new Error("Error when fetching IUserQuestionsLog");
        }
    }

    static async validateAnswer(userId: string, questionId: number, userAnswer: string): Promise<IAnswerValidationResult> {
        try {
            var body = {
                userId: userId,
                questionId: questionId,
                answer: userAnswer
            };

            const options = await getOptionsWithBody("POST", body);
            const response: HttpResponse<IAnswerValidationResult> = await fetch(questionPleaseApiUrl + "/validate", options);
            response.parsedBody = await response.json();

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            if (response.parsedBody === null || response.parsedBody === undefined) {
                throw new Error("Fetched IAnswerValidationResult is undefined");
            }

            return response.parsedBody;
        }
        catch (ex) {
            throw new Error("Error when fetching IAnswerValidationResult");
        }
    }
}

export default QuestionService;