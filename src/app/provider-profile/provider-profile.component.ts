import { Component } from '@angular/core';
import { ProviderMenuComponent } from '../provider-menu/provider-menu.component';
import { ProviderHeaderComponent } from '../provider-header/provider-header.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [ProviderMenuComponent, ProviderHeaderComponent, SharedModule],
  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.scss',
})
export class ProviderProfileComponent {
  isFormLoaded = false;
  isSavingInProgress = false;
  firstFormGroup: any;
  serviceTypes: any = [];
  user: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: ApiService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getUser();
  }

  async ngOnInit() {
    this.createForm();
    await this.loadServiceProvider();
  }

  async loadServiceProvider() {
    try {
      const res: any = await this.authService.getProviderCategoriesAll();
      if (res && res.meta.status === 200) {
        this.serviceTypes = res.data.data;
      }
    } catch (ex: any) {
      if (ex.error.meta.message) {
        this.toastr.error(ex.error.meta.message, 'Error');
      }
    }
  }

  createForm() {
    this.firstFormGroup = this.fb.group({
      about: [
        this.user?.about || '',
        Validators.compose([Validators.required]),
      ],
      visiting_charges: [
        this.user?.visiting_charges || '',
        Validators.compose([Validators.required]),
      ],
      email: [
        this.user?.email || '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      skills: [
        this.user?.skills || [],
        Validators.compose([Validators.required]),
      ],
    });

    this.isFormLoaded = true;
  }

  async update() {
    this.isSavingInProgress = true;
    if (this.firstFormGroup.valid) {
      try {
        const res: any = await this.authService.updateProviderProfile(
          this.firstFormGroup.value,
          this.user._id
        );
        if (res && res.isSuccess) {
          this.toastr.error('Profile updated successfully.', 'Success');
        }
      } catch (ex: any) {
        this.toastr.error('Error sending OTP.', 'Error');
      }
    }
    this.isSavingInProgress = false;
  }
}
