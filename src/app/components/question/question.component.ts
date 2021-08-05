import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { environment } from '../../../environments/environment';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class Question {
  // variables
  questionsArray = environment.questions.questionArray;
  recentError?: { error: any };
  formData: NgForm;

  // questions
  radioQ1 = [];
  checkQ2 = [];
  radioQ3 = [];
  checkQ4 = [];
  
  // reactive form
  rForm: FormGroup;

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private questionService: QuestionService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
    this.getAnswersFromAQuestion();
  }

  //reactive form
  createForm() {
    this.rForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      numberProducts: ['', Validators.required],
      email: [ '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      comments: [''],
      radioQuestion1  : [''],
      checkQuestion2  : new FormArray([], this.minSelectedCheckboxes(1)),
      radioQuestion3  : [''],
      checkQuestion4  : new FormArray([], this.minSelectedCheckboxes(1))
    });    
  }

  
  // get answersQuestion1
  public get answersQuestion1(){
    return this.questionsArray[0].answers;
  }
  
  // get answersQuestion2
  public get answersQuestion2(){
    return this.questionsArray[1].answers;
  }
  
  // get answersQuestion3
  public get answersQuestion3(){
    return this.questionsArray[2].answers;
  }

   // get answersQuestion4
   public get answersQuestion4(){
    return this.questionsArray[3].answers;
  }

  // get checkQuestion2Array
  get getCheckQuestion2Array() {
    return this.rForm.controls.checkQuestion2 as FormArray;
  }
 
  // get checkQuestion4Array
  get getCheckQuestion4Array() {
    return this.rForm.controls.checkQuestion4 as FormArray;
  }

  getAnswersFromAQuestion(){

    // radioQ1 - mimic async orders
    of(this.answersQuestion1).subscribe(answer => {
      this.radioQ1 = answer;
      this.rForm.controls.radioQuestion1;
    });  
    
    // checkQ2 - mimic async orders
    // all the answers for question 2 
    of(this.answersQuestion2).subscribe(answer => {
      this.checkQ2 = answer;
      this.addCheckboxes2();
    });  
    
    // radioQ3 - mimic async orders
    of(this.answersQuestion3).subscribe(answer => {
      this.radioQ3 = answer;
      this.rForm.controls.radioQuestion3;
    }); 

     // checkQ4 - mimic async orders
     of(this.answersQuestion4).subscribe(answer => {
      this.checkQ4 = answer;
      this.addCheckboxes4();
    }); 

  }

  // get firstNameInvalid
  get firstNameInvalid() {
    return (
      this.rForm.get('firstName').invalid && this.rForm.get('firstName').touched
    );
  }

  // get lastNameInvalid
  get lastNameInvalid() {
    return (
      this.rForm.get('lastName').invalid && this.rForm.get('lastName').touched
    );
  }

  // get numberProductsInvalid
  get numberProductsInvalid() {
    return (
      this.rForm.get('numberProducts').invalid &&
      this.rForm.get('numberProducts').touched
    );
  }

  // get emailInvalid
  get emailInvalid() {
    return this.rForm.get('email').invalid && this.rForm.get('email').touched;
  }

  // sendForm
  public sendForm(): void {

    if (this.rForm.invalid) {
      console.log('The form is invalid!!!');
      console.log(this.rForm);
      return Object.values(this.rForm.controls).forEach((control) =>
        control.markAsTouched()
      );

    }

    this.recaptchaV3Service.execute('post').subscribe(
      (token) => {
        console.log(this.rForm.value);
        this.questionService.postData(token, this.rForm.value);
      },
      (error) => {
        this.recentError = { error };
      }
    );

  }

  private addCheckboxes2() {
    this.checkQ2.forEach(() => this.getCheckQuestion2Array.push(new FormControl(false)));
    console.log(this.getCheckQuestion2Array);
  }

  private addCheckboxes4() {
    this.checkQ4.forEach(() => this.getCheckQuestion4Array.push(new FormControl(false)));
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }
}
