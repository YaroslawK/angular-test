import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="">
      <section class="listing-description"><h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}},{{housingLocation?.state}}</p></section>
      <section class="listing-features">
        <h2 class="leasting-heading">About this housing location</h2>
        <ul>
          <li>Units available:{{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input type="text" formControlName='firstName' id="first-name">
          <label for="last-name">Last Name</label>
          <input type="text" formControlName='lastName' id="last-name">
          <label for="email">Email</label>
          <input type="email" formControlName='email' id="email">
          <button class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: [`./details.component.css`]
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = 0;
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })
  housingService = inject(HousingService);
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
}
