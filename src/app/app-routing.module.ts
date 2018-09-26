import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';

const APP_ROUTES: Routes = [
    { path: '', component: ListComponent, pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'adicionar', component: DetailComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
imports: [
    RouterModule.forRoot(APP_ROUTES)
],
exports: [
    RouterModule
]
})
export class AppRoutingModule {}
