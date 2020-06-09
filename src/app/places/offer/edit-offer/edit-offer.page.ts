import { PlacesService } from './../../places.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Places } from '../../place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Places;

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, private placeService: PlacesService) { }

  ngOnInit() {
   this.activatedRoute.paramMap.subscribe((paramMap) => {
    if (!paramMap.has('placeId')){
      this.navCtrl.navigateBack('places/tabs/offer');
      return;
    }
    this.place = this.placeService.getPlace(paramMap.get('placeId'));
   });
  }

}
