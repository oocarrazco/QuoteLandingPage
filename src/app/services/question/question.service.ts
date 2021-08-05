import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class QuestionService {
  dataObj = {
    captchaToken: '',
    firstName: '',
    lastName: '',
    email: '',
    numberProducts: '',
    comments: '',
    radioQuestion1: '',
    checkQuestion2: [],
    radioQuestion3: '',
    checkQuestion4: [],
  };
  answersQ2 = environment.questions.questionArray[1].answers.map(x => x.text);
  answersQ4 = environment.questions.questionArray[3].answers.map(x => x.text);

  constructor(private http: HttpClient) {}

  postData(token: string, formData: any) {

    this.dataObj.captchaToken = token;
    let data = Object.assign(this.dataObj, formData);
    data.checkQuestion2 = this.getQ2Answers(data.checkQuestion2);
    data.checkQuestion4 = this.getQ4Answers(data.checkQuestion4);

        console.log(data);
        //console.log(this.getQ2Answers(data.checkQuestion2));

    this.http
      .post('https://localhost:44381/v1/quote', data)
      .subscribe((res) => {
      });
  }

  getQ2Answers(cbBoolAnswers){

    return cbBoolAnswers.reduce((acc, curr, index) => 
      acc = curr ? acc + `\n\t${this.answersQ2[index]}` : acc,"");
  }

  getQ4Answers(cbBoolAnswers){

    return cbBoolAnswers.reduce((acc, curr, index) => 
      acc = curr ? acc + `\n\t${this.answersQ4[index]}` : acc,"");
  }
}
