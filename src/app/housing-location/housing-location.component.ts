import { Component, Input } from "@angular/core";
import { HousingLocation } from "../housing-location";

@Component({
  selector: "app-housing-location",
  template: ` 
  <section>
    <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
    <h2 class="listing-heading">{{housingLocation.name}}</h2>
    <p class="listing-location">{{housingLocation.city}}, {{housingLocation.state}} </p>
  </section> `,
  styleUrls: ['./housing-location.component.css'], // Правильне підключення зовнішнього CSS-файлу
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
