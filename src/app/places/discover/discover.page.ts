import { Places } from './../place.model';
import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  loadedPlaces: Places[];
  listedLoadedPlaces: Places[];

  constructor(private placeService: PlacesService, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.loadedPlaces = this.placeService.places;
    this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  }

  onOpenMenu(){
    this.menuCtrl.toggle();
  }

  onFilterUpdate($event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }

}
