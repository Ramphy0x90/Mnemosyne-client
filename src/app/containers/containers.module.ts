import { NgModule } from '@angular/core';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LogInComponent, SignUpComponent],
  imports: [CommonModule, RouterModule],
})
export class ContainersModule {}
