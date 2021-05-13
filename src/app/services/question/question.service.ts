import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class QuestionService {
  // questions = environment.questions;

  constructor(private http: HttpClient) {}

  postQuestion(token: string, question: string) {
    const data = {
      captchaToken: token,
      question: question,
    };

    this.http
      .post('https://localhost:44381/v1/quote', data)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
