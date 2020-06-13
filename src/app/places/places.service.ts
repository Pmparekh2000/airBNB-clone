import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Places } from './place.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  // Subject is an object construct imported from "rxjs"
  private _places = new BehaviorSubject<Places[]>([
    new Places(
      'p1',
      'Prerak mantion',
      'In the heart of nature',
      'https://i.ytimg.com/vi/_L-7MxUBGL8/maxresdefault.jpg',
      1000,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Places(
      'p2',
      'Siddhi mantion',
      'In the heart of nature',
      'https://images.hdqwalls.com/download/amazing-beautiful-places-1920x1080.jpg',
      2000,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Places(
      'p3',
      'Vanshika mantion',
      'In the heart of nature',
      'https://www.tripsavvy.com/thmb/eEymkEZ9Ys9LxYw6yPGgbxCvNT4=/2125x1411/filters:fill(auto,1)/GettyImages-534909771-580f5f4c5f9b58564cc08bf2.jpg',
      3000,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
  ]);

  constructor(private authService: AuthService) {}

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    desciption: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Places(
      Math.random().toString(),
      title,
      desciption,
      'https://cdn.vox-cdn.com/thumbor/rUwkUuReeunwkJPobbQfXKogIPo=/0x33:645x396/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/47920091/winslow-house-thumb.0.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    // console.log(placeId);
    // console.log(title);
    return this.places.pipe(
    take(1),
    delay(1000),
    tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId );
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Places(oldPlace.id, title, description, oldPlace.imageUrl , oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
      this._places.next(updatedPlaces);
    }));
    
  }
}
