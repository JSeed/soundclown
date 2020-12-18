import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StateService } from './../core/services/state.service';
import { TracksService } from '../core/services/tracks.service';

interface PlaybackState {
    playing: boolean;
    totalTime: number;
    currentTime: number;
    remainingTime: number;
}

const initialState:PlaybackState = {
    playing: false,
    totalTime: 0,
    currentTime: 0,
    remainingTime: 0,
};

@UntilDestroy()
@Injectable({
    providedIn: 'root',
})
export class PlaybackStateService extends StateService<PlaybackState> {

    playing$ = this.select((state) => state.playing);
    times$ = this.select(({ currentTime, totalTime, remainingTime }) => ({ currentTime, totalTime, remainingTime }));

    constructor(
        private tracksService: TracksService,
    ) {
        super(initialState);

        tracksService.selectedTrack$.pipe(
            filter((val) => !val),
            untilDestroyed(this),
        ).subscribe(() => {
            this.setState(initialState);
        });
    }

    setPlaying(playing: boolean): void {
        this.setState({ playing });
    }

    setTimes({ currentTime, totalTime, remainingTime }): void {
        this.setState({ currentTime, totalTime, remainingTime });
    }
}
