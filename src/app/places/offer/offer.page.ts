import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Places } from '../place.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  
  places: Places[];

  constructor(private placeService: PlacesService) { }

  ngOnInit() {
    this.places = this.placeService.places;
  }

}
