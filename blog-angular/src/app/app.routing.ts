// Imports necesarios para el routing
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

// Importar los componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { IdentityGuard } from './services/identity.guard';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { InfoCovidComponent } from './components/info-covid/info-covid.component';


// Definir las router
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'posts', component: AllPostsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard]},
    {path: 'crear-categoria', component: CategoryNewComponent, canActivate: [IdentityGuard]},
    {path: 'crear-entrada', component: PostNewComponent, canActivate: [IdentityGuard]},
    {path: 'entrada/:id', component: PostDetailComponent},
    {path: 'editar-entrada/:id', component: PostEditComponent, canActivate: [IdentityGuard]},
    {path: 'info-covid', component: InfoCovidComponent},
    {path: '**', component: ErrorComponent}
];

// Exportar configuración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
