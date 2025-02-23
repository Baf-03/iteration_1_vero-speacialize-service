import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/** A simple interface for each wizard step */
interface Step {
  question: string;
  options: string[];
  answer: string;
}

interface ProviderCategory {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-dynamic-steps-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.scss']
})
export class DynamicStepsFormComponent implements OnInit {
  steps: Step[] = [
    {
      question: 'Step 1: What kind of location is this?',
      options: ['Home', 'Business'],
      answer: ''
    },
    {
      question: 'Step 2: What type of cleaning do you need?',
      options: ['Housekeeping', 'Move-out', 'Post-Construction Cleanup'],
      answer: ''
    },
    {
      question: 'Step 3: Which frequency do you prefer?',
      options: ['One-time', 'Weekly', 'Monthly'],
      answer: ''
    },
    {
      question: 'Step 4: Do you have any pets?',
      options: ['No', 'Yes, 1 pet', 'Yes, multiple pets'],
      answer: ''
    },
    {
      question: 'Step 5: How many bedrooms?',
      options: ['1', '2', '3', '4+'],
      answer: ''
    },
    {
      question: 'Step 6: How many bathrooms?',
      options: ['1', '2', '3', '4+'],
      answer: ''
    },
    {
      // Step 7: Additional services (multi-select)
      question: 'Step 7: Any additional services?',
      options: [],
      answer: ''
    }
  ];
  currentStepIndex = 0;

  // Modal flags and form fields
  showSelectAddressModal = false;
  addresses = [
    { label: 'Home', addressLine: '49099 Road 426, Oakhurst, California - 93644' },
    { label: 'Office', addressLine: '49099 Road 426, Oakhurst, California - 93644' }
  ];
  selectedAddress = '';

  showNewAddressModal = false;
  yourLocation = '';
  selectLocation = '';
  buildingStreet = '';
  yourName = '';
  addressType = 'Home';

  showDateTimeModal = false;
  selectedDay: number | null = null;
  times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  selectedTime = '';

  // Additional service options loaded from API
  providerCategories: ProviderCategory[] = [];
  // Store selected service IDs (multiple selection)
  selectedServiceIds: string[] = [];

  // Hard-coded job details (adjust as needed)
  jobDescription = 'This is test job';
  categoryId = '5c9b5cedabd21a4b63c3f4fc';
  jobType = 'Now';

  // New property to hold the created job id
  jobId: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProviderCategories();
  }

  get totalSteps() {
    return this.steps.length;
  }

  isStepValid(): boolean {
    // For steps 1-6: ensure an answer is provided
    // For step 7: at least one additional service must be selected
    if (this.currentStepIndex === 6) {
      return this.selectedServiceIds.length > 0;
    }
    return this.steps[this.currentStepIndex].answer.trim() !== '';
  }

  nextStep() {
    if (this.isStepValid() && this.currentStepIndex < this.totalSteps - 1) {
      this.currentStepIndex++;
    }
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  isLastStep(): boolean {
    return this.currentStepIndex === this.totalSteps - 1;
  }

  submitForm() {
    if (this.isStepValid()) {
      const postBody = {
        jobDescription: this.jobDescription,
        services: this.selectedServiceIds,
        categoryId: this.categoryId,
        type: this.jobType
      };

      const token = localStorage.getItem('token') || '';
      const headers = new HttpHeaders({
        'Authorization': token,
        'Content-Type': 'application/json'
      });

      this.http.post<any>('job', postBody, { headers }).subscribe({
        next: (resp) => {
          // Save the job id returned from the API response.
          // Expected response structure: { result: { _id: "67ba60e010156f521c8f0996", ... }, isSuccess: true }
          if (resp && resp.result && resp.result._id) {
            this.jobId = resp.result._id;
          }
          console.log('Job created:', resp);
          this.showSelectAddressModal = true;
        },
        error: (err) => {
          console.error('Error creating job:', err);
        }
      });
    }
  }

  isStepCompleted(stepIndex: number): boolean {
    return stepIndex < this.currentStepIndex;
  }

  isCurrentStep(stepIndex: number): boolean {
    return stepIndex === this.currentStepIndex;
  }

  // API call: GET Provider Categories for Additional Services (Step 7)
  loadProviderCategories(): void {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': token
    });

    this.http.get<any>('provider-category', { headers }).subscribe({
      next: (data) => {
        const categories = data.result;
        this.providerCategories = categories;
        // Optionally update steps[6].options if needed:
        this.steps[6].options = categories.map((cat: any) => cat.name);
      },
      error: (err) => {
        console.error('Error loading provider categories:', err);
      }
    });
  }

  // Toggle selection for a service in step 7
  toggleServiceSelection(serviceId: string, isChecked: boolean): void {
    if (isChecked) {
      if (!this.selectedServiceIds.includes(serviceId)) {
        this.selectedServiceIds.push(serviceId);
      }
    } else {
      this.selectedServiceIds = this.selectedServiceIds.filter(id => id !== serviceId);
    }
  }

  // Helper method to handle checkbox change event with proper type assertion
  onCheckboxChange(event: Event, categoryId: string): void {
    const checked = (event.target as HTMLInputElement)?.checked;
    this.toggleServiceSelection(categoryId, checked);
  }

  // SELECT ADDRESS MODAL methods
  onContinueFromSelectAddress() {
    if (!this.selectedAddress) return;
    this.showSelectAddressModal = false;
    this.showDateTimeModal = true;
  }

  openNewAddressModal() {
    this.showSelectAddressModal = false;
    this.showNewAddressModal = true;
  }

  onSaveAddress() {
    const addressData = {
      yourLocation: this.yourLocation,
      selectLocation: this.selectLocation,
      buildingStreet: this.buildingStreet,
      yourName: this.yourName,
      addressType: this.addressType
    };
    console.log('New Address:', addressData);

    this.addresses.push({
      label: addressData.addressType,
      addressLine: `${addressData.buildingStreet}, ${addressData.selectLocation}`
    });

    this.yourLocation = '';
    this.selectLocation = '';
    this.buildingStreet = '';
    this.yourName = '';
    this.addressType = 'Home';

    this.showNewAddressModal = false;
    this.showSelectAddressModal = true;
  }

  // SELECT DATE & TIME MODAL methods
  onSelectDay(day: number) {
    this.selectedDay = day;
  }

  isDaySelected(day: number) {
    return this.selectedDay === day;
  }

  onContinueFromDateTime() {
    // Only pass the jobId as query param
    if (!this.selectedDay || !this.selectedTime || !this.jobId) return;
    this.showDateTimeModal = false;

    const queryParams = { jobId: this.jobId };
    this.router.navigate(['/gigs-listing'], { queryParams });
  }
}
