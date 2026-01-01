import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TaskViewComponent} from './task-view/task-view.component';
import { NewListComponent } from './new-list/new-list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import {LoginPageComponent} from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes:Routes = [
    {
        path:'',
        redirectTo:'root',
        pathMatch: "full"
    },
    {
        path:'login',
        component:LoginPageComponent
    },{
        path:'signup',
        component:SignupPageComponent
    },
    {
        path:'root',
        component:TaskViewComponent
    },
    {
        path:'root/:listId',
        component:TaskViewComponent
    },
    {
        path:'new-list',
        component: NewListComponent
    },
    {
        path:'edit-list/:listId',
        component: EditListComponent
    },
    {
        path:'new-task/:listId',
        component: NewTaskComponent
    },{
        path:'edit-task/:listId/:taskId',
        component: EditTaskComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ViewsRoutingModule { }
  