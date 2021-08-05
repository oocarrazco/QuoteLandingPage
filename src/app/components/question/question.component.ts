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

  // for questions
  checkServices = [];
  checkHostingPlans = [];

  // for reactive form
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
      services  : new FormArray([], this.minSelectedCheckboxes(1)),
      hostingPlans  : new FormArray([], this.minSelectedCheckboxes(1))
    });    
  }
  
  // get answersServices from the enviroment array
  public get answersServices(){
    return this.questionsArray[0].answers;
  }

   // get answersHostingPlans from the enviroment array
   public get answersHostingPlans(){
    return this.questionsArray[1].answers;
  }

  // get CheckServicesArray
  get getCheckServicesArray() {
    return this.rForm.controls.services as FormArray;
  }
 
  // get CheckHostingPlansArray
  get getCheckHostingPlansArray() {
    return this.rForm.controls.hostingPlans as FormArray;
  }

  getAnswersFromAQuestion(){    

    // checkServices - mimic async orders
    // all the answers for Services 
    of(this.answersServices).subscribe(answer => {
      this.checkServices = answer;
      this.addCheckboxesServices();
    });  

    // checkHostingPlans - mimic async orders
    of(this.answersHostingPlans).subscribe(answer => {
      this.checkHostingPlans = answer;
      this.addCheckboxesHostingPlans();
    }); 
  }

  // get firstNameInvalid
  get firstNameInvalid() {
    return ( this.rForm.get('firstName').invalid && this.rForm.get('firstName').touched );
  }

  // get lastNameInvalid
  get lastNameInvalid() {
    return ( this.rForm.get('lastName').invalid && this.rForm.get('lastName').touched );
  }

  // get numberProductsInvalid
  get numberProductsInvalid() {
    return ( this.rForm.get('numberProducts').invalid && this.rForm.get('numberProducts').touched );
  }

  // get emailInvalid
  get emailInvalid() {
    return ( this.rForm.get('email').invalid && this.rForm.get('email').touched );
  }

  // sendForm
  public sendForm(): void {

    if (this.rForm.invalid) {
      console.log('The form is invalid!!!');     
      return Object.values(this.rForm.controls).forEach((control) =>
        control.markAsTouched());
    }

    this.recaptchaV3Service.execute('post').subscribe(
      (token) => {
        this.questionService.postData(token, this.rForm.value);
      },
      (error) => {
        this.recentError = { error };
      }
    );
  }

  private addCheckboxesServices() {
    this.checkServices.forEach(() => this.getCheckServicesArray.push(new FormControl(false)));
  }

  private addCheckboxesHostingPlans() {
    this.checkHostingPlans.forEach(() => this.getCheckHostingPlansArray.push(new FormControl(false)));
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
