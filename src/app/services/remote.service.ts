import { Injectable } from '@angular/core';
import { Notes } from '../notes/notes.model';
import { BehaviorSubject } from 'rxjs';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root',
})
export class RemoteService {
  notes = new BehaviorSubject<Notes[]>([]);
  notesData: Notes[] = [];
  dummyNote: Notes;
  activeNote: Notes;
  constructor(private share: ShareService) {
    this.dummyNote = {
      id: '',
      title: '',
      description: 'notes description',
      date: Date.now(),
    };
    this.getNotes();
    this.share.activeNote.subscribe((note: Notes) => {
      this.activeNote = note;
    });
  }

  getNotes() {
    this.notesData = JSON.parse(localStorage.getItem('Notes'));
    if (this.notesData == null || this.notesData.length === 0) {
      this.notesData = [{ ...this.dummyNote }];
    }
    this.notes.next([...this.notesData]);
  }

  updatedNotesData() {
    return this.notes.asObservable();
  }

  saveNote(note: Notes) {
    debugger;
    let notesDataCopy = [...this.notesData];
    let filter = notesDataCopy.filter((activeNote) => {
      return activeNote.id == '';
    });
    if (filter.length == 0) {
      this.notesData.unshift({ ...this.dummyNote });
    }
    localStorage.setItem('Notes', JSON.stringify(this.notesData));
    this.getNotes();
  }

  deleteNote() {
    let notesDataCopy = [...this.notesData];
    for (let i = 0; i < notesDataCopy.length; i++) {
      if (notesDataCopy[i].id === this.activeNote.id) {
        this.notesData.splice(i, 1);
      }
    }
    localStorage.setItem('Notes', JSON.stringify(this.notesData));
    this.notes.next([...this.notesData]);
  }

  getRandCodeForGUID() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  GetNewGUID() {
    return (
      this.getRandCodeForGUID() +
      this.getRandCodeForGUID() +
      '-' +
      this.getRandCodeForGUID() +
      '-' +
      this.getRandCodeForGUID() +
      '-' +
      this.getRandCodeForGUID() +
      '-' +
      this.getRandCodeForGUID() +
      this.getRandCodeForGUID() +
      this.getRandCodeForGUID()
    );
  }
}
