import { Component } from '@angular/core';
import { TracksService } from '../../core/services/tracks.service';

@Component({
  selector: 'sc-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent {


  constructor(
    public tracksService: TracksService,
  ) {}


}
