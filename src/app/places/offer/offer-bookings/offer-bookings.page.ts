import { PlacesService } from "./../../places.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Places } from "../../place.model";

@Component({
  selector: "app-offer-bookings",
  templateUrl: "./offer-bookings.page.html",
  styleUrls: ["./offer-bookings.page.scss"],
})
export class OfferBookingsPage implements OnInit {
  place: Places;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placeService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offer");
        return;
      }
      this.place = this.placeService.getPlace(paramMap.get('placeId'));
    });
  }

  onSeeOffer() {
    // The below code dosen't synchronises with the animation sometimes
    // this.router.navigateByUrl('places/tabs/offer');
    // Hence this code is written
    this.navCtrl.navigateBack("places/tabs/offer");
  }
}
