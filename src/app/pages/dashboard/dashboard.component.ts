import {Component, OnDestroy, OnInit} from '@angular/core';
import {LineState} from '@/models/line-state.model';
import {LineGeneral} from '@/models/line-general.model';
import {RepositoryService} from '@services/repository.service';
import {IconService} from '@services/icon.service';
import {interval, Subscription} from 'rxjs';
import {DatePipe} from '@angular/common';
import {AppState} from '@/store/state';
import {Store} from '@ngrx/store';
import {Router, NavigationEnd, Event, ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    public lineStates: LineState[] = [];
    public lines: LineGeneral[] = [];
    public viewMode: 'oee' | 'cycleTime' = 'oee';
    private lineRefreshSub!: Subscription;
    private uiSub!: Subscription;
    private dataRefreshInterval: number;

    constructor(
        private repoService: RepositoryService,
        private iconService: IconService,
        private datePipe: DatePipe,
        private store: Store<AppState>,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter(
                    (event): event is NavigationEnd =>
                        event instanceof NavigationEnd
                )
            )
            .subscribe(() => {
                const url = this.router.url;

                this.viewMode = url.includes('cycle-time')
                    ? 'cycleTime'
                    : 'oee';
                console.log('URL değişti, viewMode:', this.viewMode);

                this.getLineStates();
                this.getLines();
            });

        // İlk yüklemede de çalışmalı
        const url = this.router.url;
        this.viewMode = url.includes('cycle-time') ? 'cycleTime' : 'oee';

        this.getLineStates();
        this.getLines();

        this.uiSub = this.store.select('ui').subscribe((ui) => {
            const newInterval = ui.refreshInterval;

            if (this.dataRefreshInterval !== newInterval) {
                this.dataRefreshInterval = newInterval;

                if (this.lineRefreshSub) {
                    this.lineRefreshSub.unsubscribe();
                }

                this.lineRefreshSub = interval(
                    this.dataRefreshInterval
                ).subscribe(() => {
                    this.getLineStates();
                    this.getLines();
                });
            }
        });                
    }

    ngOnDestroy(): void {
        if (this.lineRefreshSub) {
            this.lineRefreshSub.unsubscribe();
        }

        if (this.uiSub) {
            this.uiSub.unsubscribe();
        }
    }

    private getLineStates = () => {
        this.repoService.getData('lineStates').subscribe((res) => {
            // console.clear();
            console.log('LineStates:', res);
            this.lineStates = (res as LineState[]).map((ls) => ({
                ...ls,
                iconDef: this.iconService.getIcon(ls.iconContent)
            }));
        });
    };

    private getLines = () => {
        this.repoService.getData('lines').subscribe((res) => {
            // console.clear();
            console.log('Lines:', res);
            this.lines = (res as LineGeneral[]).map((line) => ({
                ...line,
                updatedAt:
                    this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm') ||
                    '' // null kontrolü ekledik
            }));
        });
    };
}
