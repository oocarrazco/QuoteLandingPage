import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { Question } from './components/question/question.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionService } from './services/question/question.service';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";

@NgModule({
  declarations: [AppComponent, Question],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, RecaptchaV3Module],
  providers: [QuestionService, { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6Levsc0aAAAAACY_gd9AUnhBK6wvmoumqsv5iLzq" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
