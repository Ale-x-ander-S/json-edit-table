import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadingComponent} from "./components/loading/loading.component";
import {UnloadingComponent} from "./components/unloading/unloading.component";

const routes: Routes = [
  {path: '', redirectTo: 'loading', pathMatch: 'full'},
  {path: 'loading', component: LoadingComponent},
  {path: 'unloading', component: UnloadingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
