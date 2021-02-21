import { authService } from "./authService";

export interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export async function getOptions(verb: string) {
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