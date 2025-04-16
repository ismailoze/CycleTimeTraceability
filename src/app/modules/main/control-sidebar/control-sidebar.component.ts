import {AppState} from '@/store/state';
import {
    SetDarkMode,
    SetNavbarVariant,
    SetRefreshInterval,
    SetSidebarSkin,
    ToggleDarkMode
} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import {
    Option,
    NAVBAR_LIGHT_VARIANTS,
    NAVBAR_DARK_VARIANTS,
    SIDEBAR_DARK_SKINS,
    SIDEBAR_LIGHT_SKINS,
    DATA_REFRESH_INTERVAL
} from '@/utils/themes';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-control-sidebar',
    templateUrl: './control-sidebar.component.html',
    styleUrls: ['./control-sidebar.component.scss']
})
export class ControlSidebarComponent implements OnInit {
    @HostBinding('class') classes: string =
        'control-sidebar control-sidebar-dark';
    public navbarLightVariants: Array<Option> = NAVBAR_LIGHT_VARIANTS;
    public navbarDarkVariants: Array<Option> = NAVBAR_DARK_VARIANTS;
    public darkSidebarSkins: Array<Option> = SIDEBAR_DARK_SKINS;
    public lightSidebarSkins: Array<Option> = SIDEBAR_LIGHT_SKINS;
    public dataRefreshIntervalVariants: Array<Option> = DATA_REFRESH_INTERVAL;

    public ui: Observable<UiState>;
    public navbarVariant: string;
    public darkMode: boolean;
    public sidebarSkin: string;
    public refreshInterval: string;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.ui = this.store.select('ui');
        // localStorage'dan değerleri al
        const storedState = localStorage.getItem('uiState');
        const parsed = storedState ? JSON.parse(storedState) : {};

        this.navbarVariant =
            parsed.navbarVariant || NAVBAR_LIGHT_VARIANTS[0].value;
        this.darkMode = parsed.darkMode ?? false;
        this.sidebarSkin = parsed.sidebarSkin || SIDEBAR_LIGHT_SKINS[0].value;
        
        this.refreshInterval =
            parsed.refreshInterval?.toString() ||
            DATA_REFRESH_INTERVAL[0].value;

        // ilk değerleri store'a yolla
        this.store.dispatch(new SetNavbarVariant(this.navbarVariant));
        this.store.dispatch(new SetDarkMode(this.darkMode));
        this.store.dispatch(new SetSidebarSkin(this.sidebarSkin));
        this.store.dispatch(
            new SetRefreshInterval(Number(this.refreshInterval))
        );

        // store'dan gelen değişiklikleri dinle ve localStorage'a kaydet
        this.ui.subscribe((state: UiState) => {
            localStorage.setItem('uiState', JSON.stringify(state));

            this.navbarVariant = state.navbarVariant;
            this.darkMode = state.darkMode;
            this.sidebarSkin = state.sidebarSkin;
            this.refreshInterval = state.refreshInterval.toString();
        });
    }

    public handleDarkModeChange(event: any) {
        const isChecked = event.checked; // Angular Material, `event.checked` döner
        this.darkMode = isChecked;
        console.log('DarkMode value', event.checked);

        const updatedState = {
            ...JSON.parse(localStorage.getItem('uiState') || '{}'),
            darkMode: isChecked
        };
        localStorage.setItem('uiState', JSON.stringify(updatedState));

        // this.store.dispatch(new ToggleDarkMode());
        this.store.dispatch(new SetDarkMode(this.darkMode));
    }

    public onNavbarVariantChange(event: any) {
        console.log('NavbarVariant value', event.target.value);
        const selectedVariant = event.target.value;
        this.store.dispatch(new SetNavbarVariant(selectedVariant));

        // localStorage'da yeni seçilen değeri kaydet
        const updatedState = {
            ...JSON.parse(localStorage.getItem('uiState') || '{}'),
            navbarVariant: selectedVariant
        };
        localStorage.setItem('uiState', JSON.stringify(updatedState));
    }

    public onSidebarSkinChange(event: any) {
        console.log('SidebarSkin value', event.target.value);
        const selectedSkin = event.target.value;
        this.store.dispatch(new SetSidebarSkin(selectedSkin));

        // localStorage'da yeni seçilen değeri kaydet
        const updatedState = {
            ...JSON.parse(localStorage.getItem('uiState') || '{}'),
            sidebarSkin: selectedSkin
        };
        localStorage.setItem('uiState', JSON.stringify(updatedState));
    }

    public onRefreshIntervalChange(event: any) {
        const newValue = event.target.value;
        console.log('RefreshInterval value', newValue);

        const updatedState = {
            ...JSON.parse(localStorage.getItem('uiState') || '{}'),
            refreshInterval: newValue
        };
        localStorage.setItem('uiState', JSON.stringify(updatedState));

        this.store.dispatch(new SetRefreshInterval(Number(newValue)));
    }
}
