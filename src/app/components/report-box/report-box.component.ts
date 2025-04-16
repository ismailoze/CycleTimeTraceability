import {LineState} from '@/models/line-state.model';
import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-report-box',
    templateUrl: './report-box.component.html',
    styleUrl: './report-box.component.scss'
})
export class ReportBoxComponent implements OnInit {
    @Input() loading?: 'dark' | boolean;
    @Input() lineState: LineState;
    @HostBinding('class') class: string;

    ngOnInit(): void {
        this.class = `app-report-box badge-${this.lineState?.variant}`;
    }
}
