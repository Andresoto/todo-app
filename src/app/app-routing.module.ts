import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/list/list.component').then(c => c.ListComponent)
  },
  {
    path: 'task',
    loadComponent: () => import('./pages/task/task.component').then(c => c.TaskComponent)
  },
  {
    path: 'task/:id',
    loadComponent: () => import('./pages/task/task.component').then(c => c.TaskComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
