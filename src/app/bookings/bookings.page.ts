import { IonItemSliding } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { BookingService } from "./booking.service";
import { Booking } from './bookings.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  
  loadedBookings: Booking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.loadedBookings = this.bookingService.bookings;
  }

  onCancelBookings(offerId: string, slidingEl: IonItemSliding){
    slidingEl.close();
    // cancel bookings with id offer
  }

}
