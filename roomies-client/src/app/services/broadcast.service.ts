import { Injectable, EventEmitter } from '@angular/core';
import { AppEvent } from '../shared/appEvent';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  appEvent = new EventEmitter<AppEvent>();

  constructor() { }

  broadcast(event: AppEvent) {
    this.appEvent.emit(event);
  }
}
