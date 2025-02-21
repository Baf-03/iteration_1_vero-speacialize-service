import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-login-provider',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './login-provider.component.html',
  styleUrl: './login-provider.component.scss',
})
export class LoginProviderComponent {
  isFormLoaded = false;
  loginForm: any;
  isSavingInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: ApiService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });

    this.isFormLoaded = true;
  }

  async login() {
    this.isSavingInProgress = true;
    if (this.loginForm.valid) {
      try {
        const res: any = await this.authService.loginProvider(
          this.loginForm.value
        );
        if (res && res.isSuccess) {
          this.localStorageService.loginUser(res.result);
          window.location.href = '/provider-dashboard';
        }
      } catch (ex: any) {
        this.toastr.error('Error while login. Please try later.', 'Error');
      }
    }
    this.isSavingInProgress = false;
  }
}
