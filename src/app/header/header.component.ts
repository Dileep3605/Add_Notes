import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ShareService } from '../services/share.service';
import { RemoteService } from '../services/remote.service';
import { Notes } from '../notes/notes.model';
import { Subscription, SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSaveActionDisable: boolean = true;
  saveActionSubscription: Subscription;
  activeNoteSubscription: Subscription;
  activeNote: any = {};
  isLeftPanelOpen: boolean = true;
  isLeftPanelOpenSubscription: Subscription;
  isSearchOpen: boolean = true;
  searchText: string = '';
  constructor(
    private share: ShareService,
    private remote: RemoteService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.saveActionSubscription = this.share.isSaveDisable.subscribe(
      (isEnable: boolean) => {
        this.isSaveActionDisable = isEnable;
      }
    );
    this.activeNoteSubscription = this.share.activeNote.subscribe(
      (note: Notes) => {
        this.activeNote = note;
      }
    );
    this.isLeftPanelOpenSubscription = this.share.leftPanelOpenClose.subscribe(
      (isOpen: boolean) => {
        debugger;
        this.isLeftPanelOpen = isOpen;
      }
    );
  }

  ExpandCollapse() {
    this.isLeftPanelOpen = !this.isLeftPanelOpen;
    this.share.leftPanelOpenClose.emit(this.isLeftPanelOpen);
  }

  saveNote() {
    this.remote.saveNote(this.activeNote);
  }
  deleteNote() {
    this.remote.deleteNote();
  }
  searchNotes(value) {
    this.searchText = value;
    this.share.searchTextValue(value);
  }
  showSearch() {
    debugger;
    if (window.innerWidth < 620) {
      this.isSearchOpen = false;
      this.elementRef.nativeElement.querySelector('#searchTextBox').focus();
      this.share.leftPanelOpenClose.emit(!this.isLeftPanelOpen);
    }
  }
  hideSearch() {
    debugger;
    this.searchText = '';
    this.searchNotes(this.searchText);
    if (window.innerWidth < 620) {
      this.isSearchOpen = true;
      this.share.leftPanelOpenClose.emit(!this.isLeftPanelOpen);
    }
  }

  ngOnDestroy() {
    this.saveActionSubscription.unsubscribe();
    this.activeNoteSubscription.unsubscribe();
    this.isLeftPanelOpenSubscription.unsubscribe();
  }
}
