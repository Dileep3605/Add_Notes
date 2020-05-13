import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NotesComponent } from './notes/notes.component';
import { SearchPipe } from './pipe/search.pipe';
import { HighlightPipe } from './pipe/highlight.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NotesComponent, SearchPipe, HighlightPipe],
  imports: [BrowserModule, FormsModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
