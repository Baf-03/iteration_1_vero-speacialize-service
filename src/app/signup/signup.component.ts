import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isFormLoaded = false;
  loginForm: any;
  isSavingInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    this.createForm(token);
  }

  createForm(token: any) {
    this.loginForm = this.fb.group({
      fullName: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      token: [token],
    });

    this.isFormLoaded = true;
  }

  async signup() {
    this.isSavingInProgress = true;
    if (this.loginForm.valid) {
      try {
        const res = await this.authService.signUp(this.loginForm.value);
        if (res && res.isSuccess) {
          this.localStorageService.loginUser(res.result);
          window.location.href = '/';
        }
      } catch (ex: any) {
        this.toastr.error('Error sending OTP.', 'Error');
      }
    }
    this.isSavingInProgress = false;
  }
}
