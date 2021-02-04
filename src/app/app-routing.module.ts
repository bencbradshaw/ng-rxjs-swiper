import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import {pages} from './content/content';
import { NotFoundComponent } from './not-found/not-found.component';

let contentPages: Routes = Object.values(pages).map(onePage=> {
  return {
    path: onePage.path, 
    component: MainComponent, 
    data: {
     animation: onePage.animation,
     number: onePage.number
    }
  }
});
const main: Routes = [
  {path: '404', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];
const routes = [...contentPages, ...main];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
