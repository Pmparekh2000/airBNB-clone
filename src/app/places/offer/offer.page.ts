import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Places } from '../place.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  
  offers: Places[];

  constructor(private placeService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.offers = this.placeService.places;
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offer', 'edit', offerId]);
    console.log(offerId);
  }

}
