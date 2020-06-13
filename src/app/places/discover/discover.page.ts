import { AuthService } from './../../auth/auth.service';
import { Places } from './../place.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  loadedPlaces: Places[];
  listedLoadedPlaces: Places[];
  relevantPlaces: Places[];
  private placesSub: Subscription;
  private filter = 'all';

  constructor(private placeService: PlacesService, private menuCtrl: MenuController, private authService: AuthService) { }

  ngOnInit() {
    this.placesSub = this.placeService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.onFilterUpdate(this.filter);
      // console.log(this.loadedPlaces);
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    });
  }

  onOpenMenu(){
    this.menuCtrl.toggle();
  }

  onFilterUpdate(filter: string){
    // if (event.detail.value === 'all') {
    //   console.log(this.relevantPlaces);
    //   this.relevantPlaces = this.loadedPlaces;
    //   this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    // }else{
    //   this.relevantPlaces = this.loadedPlaces.filter(
    //     place => place.userId !== this.authService.userId
    //   );
    //   this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    // }
    const isShown = place => filter === 'all' || place.userId !== this.authService.userId;
    this.relevantPlaces = this.loadedPlaces.filter(isShown);
    this.filter = filter;
  }

  ngOnDestroy(){
     if (this.placesSub) {
       this.placesSub.unsubscribe();
     }
  }

}
