import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  public windowInnerWidth = window.innerHeight;
  constructor() {}
  public leftPanelOpenClose = new EventEmitter<boolean>(true);
  public isSaveDisable = new EventEmitter<boolean>(true);
  activeNote = new BehaviorSubject<object>({});
  activeNoteObservable = this.activeNote.asObservable();
  searchText = new BehaviorSubject<string>('');
  searchTextObservable = this.searchText.asObservable();

  searchTextValue(value: string) {
    this.searchText.next(value);
  }

  updateActiveNote(note: object) {
    this.activeNote.next(note);
  }
}
