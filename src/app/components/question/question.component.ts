import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { environment } from '../../../environments/environment';

import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class Question {
  question = {
    text: '',
  };

  questions = environment.questions.questionArray;
  siteKey = environment.siteKey;
  recentError?: { error: any };

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private questionService: QuestionService
  ) {}

  public sendForm(question): void {
    this.recaptchaV3Service.execute('post').subscribe(
      (token) => {
        this.postTokenAndForm(token, question);
      },

      (error) => {
        this.recentError = { error };
      }
    );

    console.log(this.recentError);
  }

  postTokenAndForm(token: string, question): void {
    console.log(token + '\n\n' + question.text);
    this.questionService.postQuestion(token, question.text);
  }
}
