import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Places } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit, OnDestroy {

  offers: Places[];
  isLoading: false;
  private placesSub: Subscription;

  constructor(private placeService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.placesSub = this.placeService.places.subscribe(places => {
      this.offers = places;
    });
  }

  ionViewWillEnter(){
    // this.isLoading = true;
    this.placeService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offer', 'edit', offerId]);
    console.log(offerId);
  }

  ngOnDestroy() {
    if (this.placesSub){
      this.placesSub.unsubscribe();
    }
  }
}
