import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ValidateTokenGuard } from './shared/guards/validate-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((auth) => auth.AuthModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks.module').then((tasks) => tasks.TasksModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
