import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ShareService } from '../services/share.service';
import { RemoteService } from '../services/remote.service';
import { Notes } from './notes.model';
import { Subscription } from 'rxjs';
ShareService;
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit, OnDestroy {
  isLeftPanelOpen: boolean = true;
  notes: Notes[];
  notesTitle: string = '';
  currentDate: number = Date.now();
  activeNote: any = {};
  activeNotesIndex: number = 0;
  clearSearch: boolean = true;
  leftPanelSubscribe: Subscription;
  notesSubscription: Subscription;
  searchTextSubscription: Subscription;
  searchText: string = '';
  constructor(
    private share: ShareService,
    private remote: RemoteService,
    private elementRef: ElementRef
  ) {
    this.leftPanelSubscribe = this.share.leftPanelOpenClose.subscribe(
      (isOpen: boolean) => {
        this.isLeftPanelOpen = isOpen;
      }
    );
  }

  ngOnInit(): void {
    this.notesSubscription = this.remote
      .updatedNotesData()
      .subscribe((notesData: Notes[]) => {
        this.notes = notesData;
        //active first note
        this.editNote(this.notes[0], 0);
      });
    this.searchTextSubscription = this.share.searchText.subscribe(
      (text: string) => {
        this.searchText = text;
      }
    );
  }

  onTypeNotes(event) {
    if (this.notes != null && this.notes.length > 0) {
      let title = event.target.value;
      this.notes[this.activeNotesIndex].title = title;
      let id = '';
      if (this.notes[this.activeNotesIndex].id == '') {
        this.notes[
          this.activeNotesIndex
        ].id = this.remote.GetNewGUID().toString();
      }
      this.checkIsSaveButtonDisable(title);
      this.updateActiveNote(this.activeNotesIndex);
    }
  }

  updateActiveNote(index: number) {
    this.share.updateActiveNote({ ...this.activeNote });
    this.checkIsSaveButtonDisable(this.notes[index].title);
    this.elementRef.nativeElement.querySelector('#textareaInput').focus();
  }

  editNote(editNote, index) {
    debugger;
    this.activeNote = editNote;
    this.activeNotesIndex = index;
    this.updateActiveNote(index);
    this.showHideOverlay();
  }

  checkIsSaveButtonDisable(title: string) {
    if (title === '') {
      this.share.isSaveDisable.emit(true);
    } else {
      this.share.isSaveDisable.emit(false);
    }
  }

  showHideOverlay() {
    debugger;
    if (window.innerWidth < 620 && this.isLeftPanelOpen) {
      this.isLeftPanelOpen = !this.isLeftPanelOpen;
      this.share.leftPanelOpenClose.emit(this.isLeftPanelOpen);
    }
  }

  ngOnDestroy() {
    this.leftPanelSubscribe.unsubscribe();
    this.notesSubscription.unsubscribe();
    this.searchTextSubscription.unsubscribe();
  }
}
