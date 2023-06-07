import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './containers/log-in/log-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { TestComponent } from './containers/dev/test/test.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'dev',
    canActivate: [AuthAdminGuard],
    children: [{ path: 'test', component: TestComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
