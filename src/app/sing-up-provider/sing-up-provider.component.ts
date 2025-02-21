import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from '../shared/api.service';
import { COUNTRIES } from '../shared/countries';
import { CITIES } from '../shared/cities';
import { STATES } from '../shared/states';

@Component({
  selector: 'app-sing-up-provider',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './sing-up-provider.component.html',
  styleUrl: './sing-up-provider.component.scss',
})
export class SingUpProviderComponent {
  files: any = {};
  isFormLoaded = false;
  isSavingInProgress = false;
  isLinear = true;
  firstFormGroup: any;
  thridFormGroup: any;
  serviceTypes: any = [];
  yesNo: any = ['Yes', 'No'];
  countries: any = [];
  cities: any = [];
  states: any = [];
  validateDetails: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: ApiService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    this.countries = COUNTRIES;
    this.createForm();
    this.loadStates();
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

  loadStates() {
    this.states = STATES.filter(
      (s) => s.country_id === this.firstFormGroup.value.country
    );
    this.cities = [];
  }

  loadCities() {
    this.cities = CITIES.filter(
      (s) => s.state_id === this.firstFormGroup.value.state
    );
  }

  createForm() {
    this.firstFormGroup = this.fb.group({
      first_name: ['', Validators.compose([Validators.required])],
      about: ['', Validators.compose([Validators.required])],
      visiting_charges: [0, Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      gender: ['Male', Validators.compose([Validators.required])],
      mobile_number: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
          ),
        ]),
      ],
      country: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zip: ['', Validators.compose([Validators.required])],
      street_address: ['', Validators.compose([Validators.required])],
      skills: [[], Validators.compose([Validators.required])],
      is_licensed: ['No', Validators.compose([Validators.required])],
      is_bonded: ['No', Validators.compose([Validators.required])],
      is_us_work_authorized: ['No', Validators.compose([Validators.required])],
      is_felony: ['No', Validators.compose([Validators.required])],
      is_dui: ['No', Validators.compose([Validators.required])],
    });

    this.isFormLoaded = true;
  }

  async register() {
    if (this.firstFormGroup.valid) {
      try {
        this.isSavingInProgress = true;
        const files = await this.sendFilesToServer();
        if (!files) {
          this.toastr.error(
            'Error while uploading files please try later',
            'Error'
          );
          return;
        }
        const payload = {
          ...this.firstFormGroup.value,
          docs: files,
        };
        const res = await this.authService.registerProvider(payload);
        if (res && res.meta && res.meta.status === 200) {
          this.toastr.success(
            'Thank you for registration. We are reviewing your profile, we will notify you if your account is verified by Vero1.',
            'Success'
          );
          this.firstFormGroup.reset();
        }
      } catch (ex: any) {
        if (ex.error.meta.message) {
          this.toastr.error(ex.error.meta.message, 'Error');
        }
      }
    }
    this.isSavingInProgress = false;
  }

  validateAllFormFields(formGroup: any) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }

  uploadFile($event: any, type: any) {
    let fileList: FileList = $event.target.files;
    if (fileList && fileList.length) {
      let file: File = fileList[0];
      this.files[type] = file;
    }
  }

  async sendFilesToServer() {
    let formData: FormData = new FormData();
    const keys = Object.keys(this.files);
    if (!keys || keys.length < 3) {
      this.toastr.error('Please upload missing files', 'Error');
      this.isSavingInProgress = false;
      return null;
    }
    for (const key of keys) {
      let file: File = this.files[key];
      formData.append(key, file, file.name);
    }
    try {
      const res = await this.authService.uploadFiles(
        formData,
        this.firstFormGroup.value.mobile_number
      );
      if (res && res.meta && res.meta.status === 200) {
        return res.data.data;
      }
      return null;
    } catch (ex: any) {
      this.toastr.error(ex.error.meta.message, 'Error');
      return null;
    }
  }
}
