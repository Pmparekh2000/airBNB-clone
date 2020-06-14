import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './bookings.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  private bookingSub: Subscription;
  loadedBookings: Booking[];
  isLoading = false;

  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
      // console.log(this.loadedBookings);
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.bookingService.fetchBookings().subscribe(() => {
      this.isLoading = false;
    });
  }

  onCancelBookings(bookingId: string, slidingEl: IonItemSliding){
    slidingEl.close();
    this.loadingCtrl.create({message: 'Cancelling'}).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
    this.bookingService.cancelBooking(bookingId).subscribe();
    // cancel bookings with id offer
  }

  ngOnDestroy(){
    if (this.bookingSub){
      this.bookingSub.unsubscribe();
    }
  }

}
