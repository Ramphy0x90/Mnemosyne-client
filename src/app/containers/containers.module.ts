import { NgModule } from '@angular/core';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './dev/test/test.component';

@NgModule({
  declarations: [LogInComponent, SignUpComponent, TestComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ContainersModule {}
