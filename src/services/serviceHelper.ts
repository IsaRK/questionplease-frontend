import { authService } from "./authService";

export interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export async function getOptions(verb: string) {
    if (!authService.hasUserSignedIn()) {
        return {
            method: verb
        };
    }

    const headers = new Headers();
    const token = await authService.getTokenPopup();

    if (!token) {
        throw new Error("Undefined Token");
    }

    const bearer = `Bearer ${token.accessToken}`;
    headers.append("Authorization", bearer);

    return {
        method: verb,
        headers: headers,
    };
}

export async function getOptionsWithBody(verb: string, data: any) {
    if (!authService.hasUserSignedIn()) {
        return {
            method: verb,
            body: JSON.stringify(data)
        };
    }

    const headers = new Headers();
    const token = await authService.getTokenPopup();

    if (!token) {
        throw new Error("Undefined Token");
    }

    const bearer = `Bearer ${token.accessToken}`;
    headers.append("Authorization", bearer);

    return {
        method: verb,
        headers: headers,
        body: JSON.stringify(data)
    };
}


//initial API : https://opentdb.com/api.php?amount=10&category=9&difficulty=easy'
export function getUserBaseUrl(): string {
    if (!authService.hasUserSignedIn()) {
        return 'https://questionplease-api-unauthentificated.azurewebsites.net/api/user/';
    }

    return 'https://questionplease-api.azurewebsites.net/api/user/';
}

export function getQuestionBaseUrl(): string {
    if (!authService.hasUserSignedIn()) {
        return 'https://questionplease-api-unauthentificated.azurewebsites.net/api/question';
    }

    return 'https://questionplease-api.azurewebsites.net/api/question';
}