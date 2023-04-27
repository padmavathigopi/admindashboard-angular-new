import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageLeadComponent } from './manage-lead/manage-lead.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateLeadComponent } from './create-lead/create-lead.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'manage-lead', component: ManageLeadComponent },
  { path: 'profile', component: ProfileComponent },

  { path: '', redirectTo: 'reports', pathMatch: 'full' },
  { path: 'reports', component: ReportsComponent },

  {path:'create-lead',component:CreateLeadComponent},//ADD COMPONENT

 

 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
