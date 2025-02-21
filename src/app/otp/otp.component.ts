import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
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
    const phone = this.activatedRoute.snapshot.paramMap.get('phone');
    this.createForm(phone);
  }

  createForm(phone: any) {
    this.loginForm = this.fb.group({
      mobileNumber: [phone, Validators.compose([Validators.required])],
      code: ['', Validators.compose([Validators.required])],
    });

    this.isFormLoaded = true;
  }

  async resend() {
    try {
      const res = await this.authService.signIn(this.loginForm.value);
      if (res && res.isSuccess) {
        this.router.navigate([`/otp/${this.loginForm.value.mobileNumber}`]);
      }
    } catch (ex: any) {
      this.toastr.error('Error sending OTP.', 'Error');
    }
  }

  async verifyOtp() {
    this.isSavingInProgress = true;
    if (this.loginForm.valid) {
      try {
        const res = await this.authService.verifyOtp(this.loginForm.value);
        if (res && res.isSuccess && res.result?.user?.is_new_user) {
          this.router.navigate(['/sign-up-customer', res.result.accessToken]);
        } else {
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
