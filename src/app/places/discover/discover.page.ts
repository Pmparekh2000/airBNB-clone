import { Places } from './../place.model';
import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  loadedPlaces: Places[];

  constructor(private placeService: PlacesService, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.loadedPlaces = this.placeService.places;
  }

  onOpenMenu(){
    this.menuCtrl.toggle();
  }

}
