import { Injectable } from '@angular/core';
import { Observable, Subject, filter, fromEvent, map } from 'rxjs';

export type CallbackDictionary = Record<string, Function>;

@Injectable({
  providedIn: 'root',
})
export class GlobalKeydownService {
  keydownEvents: Observable<string>;

  constructor() {
    this.keydownEvents = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
      filter((event) => !(event.target instanceof HTMLInputElement)),
      map((event) => event.key)
    );
  }

  handleKeydown(key: string, callbackDictionary: CallbackDictionary): void {
    const callback = callbackDictionary[key];
    if (callback === undefined) return;

    callback();
  }
}
