import { Question } from '../models/questions';
import { getOptions, getOptionsWithBody, getQuestionBaseUrl, HttpResponse } from '../services/serviceHelper';

export interface ISerializedApiQuestion {
    id: string;
    question: string;
    answers: string[];
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

            const response: HttpResponse<ISerializedApiQuestion> = await fetch(getQuestionBaseUrl(), options);
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
            var completeUrl = getQuestionBaseUrl() + "/" + questionid.toString();

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
            const response: HttpResponse<IUserQuestionsLog> = await fetch(getQuestionBaseUrl() + "/abandon", options);
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

    static async validateAnswer(userId: string | undefined, questionId: number, userAnswer: string): Promise<IAnswerValidationResult> {
        try {

            let body;

            if (userId === undefined) { //PlayWithoutLogin
                body = {
                    questionId: questionId,
                    answer: userAnswer
                }
            } else {
                body = {
                    userId: userId,
                    questionId: questionId,
                    answer: userAnswer
                };
            }

            const options = await getOptionsWithBody("POST", body);
            var url = getQuestionBaseUrl() + "/validate";
            const response: HttpResponse<IAnswerValidationResult> = await fetch(url, options);
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