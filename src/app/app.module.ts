import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './modules/main/main.component';
import {HeaderComponent} from './modules/main/header/header.component';
import {FooterComponent} from './modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from './pages/blank/blank.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faGears,
    faTriangleExclamation,
    faBan
} from '@fortawesome/free-solid-svg-icons';
import {IconService} from './services/icon.service';

import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {LanguageComponent} from './modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {LoadingComponent} from './components/loading/loading.component';
import {OverlayLoadingComponent} from './components/overlay-loading/overlay-loading.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ReportHeaderComponent} from './components/report-header/report-header.component';
import {ReportBoxComponent} from './components/report-box/report-box.component';
import {LineGeneralComponent} from './components/line-general/line-general.component';
import {LineDetailComponent} from './pages/line-detail/line-detail.component';
import {CounterDirective} from './directives/counter.directive';
import {RouterModule} from '@angular/router';
import {CustomDatePipe} from './pipes/custom-date.pipe';

import localeTr from '@angular/common/locales/tr';

registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localeTr);

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        DashboardComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        ControlSidebarComponent,
        ReportHeaderComponent,
        LoadingComponent,
        OverlayLoadingComponent,
        ReportBoxComponent,
        LineGeneralComponent,
        LineDetailComponent,
        CounterDirective,
        CustomDatePipe
    ],
    bootstrap: [AppComponent],
    imports: [
        ProfabricComponentsModule,
        CommonModule,
        BrowserModule,
        StoreModule.forRoot({ui: uiReducer}),
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        FontAwesomeModule,
        FormsModule,
        MatCheckboxModule,
        RouterModule.forRoot([])
    ],
    providers: [
        DatePipe,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        { provide: LOCALE_ID, useValue: 'tr' }
    ]
})
export class AppModule {
    constructor(library: FaIconLibrary, iconService: IconService) {
        const icons = {
            faGears,
            faTriangleExclamation,
            faBan
        };

        // Angular FontAwesome kütüphanesine ekle
        library.addIcons(...Object.values(icons));

        // IconService’e otomatik kayıt
        iconService.registerIcons(icons);
    }
}
