import { Component, OnInit, Input } from '@angular/core';
import { Places } from '../../places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() selectedPlace: Places;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onBookPlace(){
    this.modalCtrl.dismiss({message: 'This is a dummy message'}, 'confirm');
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
