import {ChangeDetectorRef} from '@angular/core';
import {AppState} from '@/store/state';
import {ToggleSidebarMenu} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import {
    AfterViewInit,
    Component,
    HostBinding,
    OnInit,
    Renderer2
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
    @HostBinding('class') class = 'wrapper';
    public ui: Observable<UiState>;
    public appLoaded: boolean = false;
    private appRoot: HTMLElement;

    constructor(
        private renderer: Renderer2,
        private store: Store<AppState>,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.appRoot = document.querySelector('app-root') as HTMLElement;

        this.renderer.addClass(
            document.querySelector('app-root'),
            'layout-top-nav'
        );

        this.ui.subscribe(
            ({menuSidebarCollapsed, controlSidebarCollapsed, darkMode}) => {
                if (controlSidebarCollapsed) {
                    this.renderer.removeClass(
                        this.appRoot,
                        'control-sidebar-slide-open'
                    );
                } else {
                    this.renderer.addClass(
                        this.appRoot,
                        'control-sidebar-slide-open'
                    );
                }

                if (darkMode) {
                    this.renderer.addClass(this.appRoot, 'dark-mode');
                } else {
                    this.renderer.removeClass(this.appRoot, 'dark-mode');
                }
            }
        );

        this.renderer.removeClass(this.appRoot, 'control-sidebar-slide-open');

        this.appLoaded = true;
    }

    onToggleMenuSidebar() {
        this.store.dispatch(new ToggleSidebarMenu());
    }

    ngAfterViewInit() {
        this.appLoaded = true;
        this.cdRef.detectChanges();
    }
}
