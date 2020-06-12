import { PlacesService } from './../../places.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Places } from '../../place.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Places;

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, private placeService: PlacesService,private formBuilder: FormBuilder) { }

  form: FormGroup;

  ngOnInit() {
   this.activatedRoute.paramMap.subscribe((paramMap) => {
    if (!paramMap.has('placeId')){
      this.navCtrl.navigateBack('places/tabs/offer');
      return;
    }
    this.place = this.placeService.getPlace(paramMap.get('placeId'));
    this.initialiseForm();
   });
  }

  initialiseForm(){
    this.form = this.formBuilder.group({
      place_name: [this.place.title, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      place_description: [this.place.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
  }

  onUpdateOffer(){
    if (!this.form.valid){
      return;
    }
    console.log(this.form);
  }
}
