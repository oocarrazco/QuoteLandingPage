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
    checkServices: [],
    checkHostingPlans: [],
  };
  
  answersServices = environment.questions.questionArray[0].answers.map(x => x.text);
  answersHostingPlans = environment.questions.questionArray[1].answers.map(x => x.text);

  constructor(private http: HttpClient) {}

  postData(token: string, formData: any) {

    this.dataObj.captchaToken = token;
    let data = Object.assign(this.dataObj, formData);
    data.services = this.getServicesAnswers(data.services);
    data.hostingPlans = this.getHostingPlansAnswers(data.hostingPlans);

    this.http
      .post(environment.apiURl, data)
      .subscribe((res) => {
      });
  }

  getServicesAnswers(cbBoolAnswers){

    return cbBoolAnswers.reduce((acc, curr, index) => 
      acc = curr ? acc + `\n\t${this.answersServices[index]}` : acc,"");
  }

  getHostingPlansAnswers(cbBoolAnswers){

    return cbBoolAnswers.reduce((acc, curr, index) => 
      acc = curr ? acc + `\n\t${this.answersHostingPlans[index]}` : acc,"");
  }
}
