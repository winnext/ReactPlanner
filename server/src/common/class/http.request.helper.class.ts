import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map, firstValueFrom } from 'rxjs';
@Injectable()
export class HttpRequestHandler {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string, headers) {
    const responsePronise = await this.httpService
      .get(url, { headers })
      .pipe(
        catchError((error) => {
          const { status, message } = error.response?.data;
          throw new HttpException(message, status);
        }),
      )
      .pipe(map((response) => response.data));

    const response = await firstValueFrom(responsePronise);
    return response;
  }
  async post(url: string, data, headers) {
    const responsePronise = await this.httpService
      .post(url, data,  {headers})
      .pipe(
        catchError((error) => {
          const { status, message } = error.response?.data;
          throw new HttpException(message, status);
        }),
      )
      .pipe(map((response) => response.data));

    const response = await firstValueFrom(responsePronise);
    return response;
  }

  async patch(url: string, data, headers) {
    const responsePronise = await this.httpService
      .patch(url, data,  {headers})
      .pipe(
        catchError((error) => {
          const { status, message } = error.response?.data;
          throw new HttpException(message, status);
        }),
      )
      .pipe(map((response) => response.data));

    const response = await firstValueFrom(responsePronise);
    return response;
  }

}
