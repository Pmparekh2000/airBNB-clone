import { PlacesService } from './../../places.service';
import { Places } from './../../place.model';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Places;

  constructor(private router: Router,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private activatedRoute: ActivatedRoute,
              private placeService: PlacesService,
              private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')){
        this.router.navigateByUrl('/places/tabs/offers');
        return;
      }else{
        this.place = this.placeService.getPlace(paramMap.get('placeId'));
      }
    });
  }

  onBookPlace(){
    // this.router.navigateByUrl('places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // this.navCtrl.pop();
    // Popping will not work if stack of page is empty
    // Can be used at start
    this.actionSheetCtrl.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'destructive'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place},
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData, resultData.data);
      if (resultData.role === 'confirm'){
        console.log('BOOKED!');
      }
    });
  }
}

