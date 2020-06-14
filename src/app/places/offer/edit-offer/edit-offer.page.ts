import { PlacesService } from './../../places.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NavController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { Places } from '../../place.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Places;
  isLoading: false;
  placeId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placeService: PlacesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  form: FormGroup;
  private placeSub: Subscription;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('places/tabs/offer');
        return;
      }
      this.placeId = paramMap.get('placeId');
      // this.isLoading = true;
      this.placeSub = this.placeService
        .getPlace(paramMap.get('placeId'))
        .subscribe(
          (place) => {
            this.place = place;
            this.initialiseForm();
            this.isLoading = false;
          },
          (error) => {
            this.alertCtrl
              .create({
                header: 'An error occured',
                message: 'Place could not be fetched',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/places/tabs/offer']);
                    },
                  },
                ],
              })
              .then((alertEl) => {
                alertEl.present();
              });
          }
        );
    });
  }

  initialiseForm() {
    this.form = this.formBuilder.group({
      place_name: [
        this.place.title,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      place_description: [
        this.place.description,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating place...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placeService
          .updatePlace(
            this.place.id,
            this.form.value.place_name,
            this.form.value.place_description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/places/tabs/offer']);
          });
      });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
