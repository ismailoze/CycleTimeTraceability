import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LineDetailComponent} from '@pages/line-detail/line-detail.component';
import {MainComponent} from '@modules/main/main.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {path: '', component: DashboardComponent}, // OEE görünümü
            {path: 'cycle-time', component: DashboardComponent}, // CycleTime görünümü
            {path: 'line/:lineId', component: LineDetailComponent}
        ]
    },
    {path: '**', redirectTo: ''} // Geçersiz yollar için yönlendirme
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
