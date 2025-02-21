import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isFormLoaded = false;
  loginForm: any;
  isSavingInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      mobileNumber: ['', Validators.compose([Validators.required])],
    });

    this.isFormLoaded = true;
  }

  async login() {
    this.isSavingInProgress = true;
    if (this.loginForm.valid) {
      try {
        const res = await this.authService.signIn(this.loginForm.value);
        if (res && res.isSuccess) {
          this.router.navigate([`/otp/${this.loginForm.value.mobileNumber}`]);
        }
      } catch (ex: any) {
          this.toastr.error('Error while login. Please try later.', 'Error');
      }
    }
    this.isSavingInProgress = false;
  }
}
