import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

/** A simple interface for each wizard step */
interface Step {
  question: string;
  options: string[];
  answer: string;  // store the chosen option here
}

@Component({
  selector: 'app-dynamic-steps-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.scss']
})
export class DynamicStepsFormComponent {
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
          question: 'Step 7: Any additional services?',
          options: ['Laundry', 'Windows', 'Refrigerator', 'None'],
          answer: ''
        }
      ];
      currentStepIndex = 0;
    
      // After user completes step 7, show "Select Address" modal
      showSelectAddressModal = false;
    
      // Addresses in the "Select Address" modal
      addresses = [
        { label: 'Home', addressLine: '49099 Road 426, Oakhurst, California - 93644' },
        { label: 'Office', addressLine: '49099 Road 426, Oakhurst, California - 93644' }
      ];
      selectedAddress = '';
    
      // If user clicks "Add a new address"
      showNewAddressModal = false;
      // Fields for "Add new address" form
      yourLocation = '';
      selectLocation = '';
      buildingStreet = '';
      yourName = '';
      addressType = 'Home';
    
      // === New Modal: Select Date & Time ===
      showDateTimeModal = false;
      // For the date, we’ll highlight a day in March 2024
      selectedDay: number | null = null;
      // For the time dropdown
      times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
      selectedTime = '';
    
      constructor(private router: Router) {}
    
      // === Step Wizard Logic ===
      get totalSteps() {
        return this.steps.length;
      }
    
      isStepValid(): boolean {
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
    
      // When user clicks "Submit" on step 7
      submitForm() {
        if (this.isStepValid()) {
          // Show the "Select Address" modal
          this.showSelectAddressModal = true;
        }
      }
    
      // Step indicator helpers
      isStepCompleted(stepIndex: number): boolean {
        return stepIndex < this.currentStepIndex;
      }
    
      isCurrentStep(stepIndex: number): boolean {
        return stepIndex === this.currentStepIndex;
      }
    
      // === SELECT ADDRESS MODAL ===
      onContinueFromSelectAddress() {
        if (!this.selectedAddress) return;
        // Hide this modal and show the date/time modal
        this.showSelectAddressModal = false;
        this.showDateTimeModal = true;
      }
    
      openNewAddressModal() {
        this.showSelectAddressModal = false;
        this.showNewAddressModal = true;
      }
    
      // === ADD NEW ADDRESS MODAL ===
      onSaveAddress() {
        // Just log for now
        const addressData = {
          yourLocation: this.yourLocation,
          selectLocation: this.selectLocation,
          buildingStreet: this.buildingStreet,
          yourName: this.yourName,
          addressType: this.addressType
        };
        console.log('New Address:', addressData);
    
        // Add to addresses array if you want
        this.addresses.push({
          label: addressData.addressType,
          addressLine: `${addressData.buildingStreet}, ${addressData.selectLocation}`
        });
    
        // Clear form
        this.yourLocation = '';
        this.selectLocation = '';
        this.buildingStreet = '';
        this.yourName = '';
        this.addressType = 'Home';
    
        // Hide "Add new address" modal, show "Select Address" modal again
        this.showNewAddressModal = false;
        this.showSelectAddressModal = true;
      }
    
      // === SELECT DATE & TIME MODAL ===
      onSelectDay(day: number) {
        this.selectedDay = day;
      }
    
      isDaySelected(day: number) {
        return this.selectedDay === day;
      }
    
      // After user picks day/time
      onContinueFromDateTime() {
        if (!this.selectedDay || !this.selectedTime) return;
        // Close the modal
        this.showDateTimeModal = false;
        // Finally redirect
        this.router.navigate(['/gigs-listing']);
      }
    }