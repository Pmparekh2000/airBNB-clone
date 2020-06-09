import { Injectable } from '@angular/core';
import { Places } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Places[] = [
    new Places(
      'p1',
      'Prerak mantion',
      'In the heart of nature',
      'https://i.ytimg.com/vi/_L-7MxUBGL8/maxresdefault.jpg',
      1000
    ),
    new Places(
      'p2',
      'Siddhi mantion',
      'In the heart of nature',
      'https://images.hdqwalls.com/download/amazing-beautiful-places-1920x1080.jpg',
      2000
    ),
    new Places(
      'p3',
      'Vanshika mantion',
      'In the heart of nature',
      'https://www.tripsavvy.com/thmb/eEymkEZ9Ys9LxYw6yPGgbxCvNT4=/2125x1411/filters:fill(auto,1)/GettyImages-534909771-580f5f4c5f9b58564cc08bf2.jpg',
      3000
    ),
  ];

  get places() {
    return [...this._places];
  }

  getPlace(id: string){
    return {...this._places.find(p => p.id === id)};
  }

  constructor() {}
}
