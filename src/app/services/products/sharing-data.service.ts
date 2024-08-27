import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  private _newProductEventEmitter: EventEmitter<Product> = new EventEmitter();

  private _idProductEventEmitter = new EventEmitter();

  private _findProductByIdEventEmitter = new EventEmitter();

  private _selectProductEventEmitter = new EventEmitter();

  private _errorsProductFormEventEmitter = new EventEmitter();

  private _pageProductEventEmitter = new EventEmitter();


  constructor() {}


  get pageProductEventEmitter() {
    return this._pageProductEventEmitter;
  }
  get errorsProductFormEventEmitter() {
    return this._errorsProductFormEventEmitter;
  }

  get selectProductEventEmitter() {
    return this._selectProductEventEmitter;
  }

  get findProductByIdEventEmitter() {
    return this._findProductByIdEventEmitter;
  }

  get newProductEventEmitter(): EventEmitter<Product> {
    return this._newProductEventEmitter;
  }

  get idProductEventEmitter(): EventEmitter<number> {
    return this._idProductEventEmitter;
  }
}
