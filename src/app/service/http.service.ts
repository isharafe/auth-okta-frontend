import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
    private baseUrl = 'http://localhost:7000';
    private apiPrefixUri = "api";

    private prefixUri = `${this.baseUrl}/${this.apiPrefixUri}/`;

    constructor(
        private httpClient: HttpClient,
    ) {}

    callServer(url: string, method: HttpMethods, data?: any): Observable<any> {
        const serverUrl = `${this.prefixUri}${url}`;
        if(method == HttpMethods.GET) {
            return this.httpClient.get(serverUrl, {params: data});
        } else if (method == HttpMethods.POST) {
            return this.httpClient.post(serverUrl, data);
        } else if (method == HttpMethods.PUT) {
            return this.httpClient.put(serverUrl, data);
        }

        throw new Error(`Invalid http method: ${method}`);
    }
}

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
