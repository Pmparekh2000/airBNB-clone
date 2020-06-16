import { PlaceLocation } from './location.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Places } from './place.model';
import { BehaviorSubject, pipe, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
}

// [
//   new Places(
//     'p1',
//     'Prerak mantion',
//     'In the heart of nature',
//     'https://i.ytimg.com/vi/_L-7MxUBGL8/maxresdefault.jpg',
//     1000,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Places(
//     'p2',
//     'Siddhi mantion',
//     'In the heart of nature',
//     'https://images.hdqwalls.com/download/amazing-beautiful-places-1920x1080.jpg',
//     2000,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Places(
//     'p3',
//     'Vanshika mantion',
//     'In the heart of nature',
//     'https://www.tripsavvy.com/thmb/eEymkEZ9Ys9LxYw6yPGgbxCvNT4=/2125x1411/filters:fill(auto,1)/GettyImages-534909771-580f5f4c5f9b58564cc08bf2.jpg',
//     3000,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
// ]

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  // Subject is an object construct imported from "rxjs"
  private _places = new BehaviorSubject<Places[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  get places() {
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://angular9-ionic5-course.firebaseio.com/offered-places.json'
      )
      .pipe(
        map((resData) => {
          // console.log(resData);
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Places(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId,
                  resData[key].location
                )
              );
            }
          }
          return places;
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }

  getPlace(id: string) {
    return (
      this.http
      .get<PlaceData>(
        `https://angular9-ionic5-course.firebaseio.com/offered-places/${id}.json`
      )
      .pipe(
        map(placeData => {
          return new Places(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId,
            placeData.location
          );
        })
      )
    );
  }

  uploadImage(image: string) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.http.post<{imageUrl: string, imagePath: string}>(
      'https://us-central1-angular9-ionic5-course.cloudfunctions.net/storeImage',
      uploadData
    );
  }

  addPlace(
    title: string,
    desciption: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation,
    imageUrl: string
  ) // console.log(userId);
  {
    let generateId: string;
    const newPlace = new Places(
      Math.random().toString(),
      title,
      desciption,
      imageUrl,
      price,
      dateFrom,
      dateTo,
      this.authService.userId,
      location
    );
    return this.http
      .post<{ name: string }>(
        'https://angular9-ionic5-course.firebaseio.com/offered-places.json',
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((resData) => {
          generateId = resData.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generateId;
          this._places.next(places.concat(newPlace));
          console.log(newPlace.userId);
          console.log(generateId);
        })
      );
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(places => {
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {
    // console.log(placeId);
    // console.log(title);
    let updatedPlaces: Places[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0 ){
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
      const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
      updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Places(
        oldPlace.id,
        title,
        description,
        oldPlace.imageUrl,
        oldPlace.price,
        oldPlace.availableFrom,
        oldPlace.availableTo,
        oldPlace.userId,
        oldPlace.location
      );
      return this.http.put(
        `https://angular9-ionic5-course.firebaseio.com/offered-places/${placeId}.json`,
        { ...updatedPlaces[updatedPlaceIndex], id: null }
      );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
