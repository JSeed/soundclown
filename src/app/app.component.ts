import { Component } from '@angular/core';
import { TracksService } from './core/services/tracks.service';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public tracksService: TracksService
  ) {}

  title = 'soundclown';

}
