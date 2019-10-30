import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskViewComponent } from './task-view/task-view.component';
import {ViewsRoutingModule} from './views.routing';
import { webRequestService } from './services/webRequest.service';
import { TaskService } from './services/task.service';
import { ListService } from './services/list.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NewListComponent } from './new-list/new-list.component';
import {FormsModule} from '@angular/forms';
import { NewTaskComponent } from './new-task/new-task.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthService } from './services/Auth.service';
import { webRequestInterceptor } from './services/webRequest.Interceptor';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
@NgModule({
  declarations: [TaskViewComponent, NewListComponent, NewTaskComponent, LoginPageComponent, SignupPageComponent, EditListComponent, EditTaskComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[
    webRequestService,
    TaskService,
    ListService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass:webRequestInterceptor, multi:true
    }  
  ]
})
export class ViewsModule { }
