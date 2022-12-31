
import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './authentication/helpers/auth.guard';

export const Approutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            // {
            //     path: '**',
            //     redirectTo: '/accueil'
            // },
            { path: '', redirectTo: '/accueil', pathMatch: 'full' },
            {
                path: '',
                loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'starter',
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
            },
            {
                path: 'component',
                loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
            },
            { path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) },

            { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
            { path: 'forms', loadChildren: () => import('./form/forms.module').then(m => m.FormModule) },
            { path: 'tables', loadChildren: () => import('./table/tables.module').then(m => m.TablesModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartModule) },
            {
                path: 'widgets',
                loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
            },
            { path: 'ecom', loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule) },
            {
                path: 'timeline',
                loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
            },
            {
                path: 'extra-component',
                loadChildren:
                    () => import('./extra-component/extra-component.module').then(m => m.ExtraComponentModule)
            },
            { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
            { path: 'apps/email', loadChildren: () => import('./apps/email/mail.module').then(m => m.MailModule) },

            //{ path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
            {
                path: 'sample-pages',
                loadChildren: () => import('./sample-pages/sample-pages.module').then(m => m.SamplePagesModule)
            },
            
            { path: 'demande', loadChildren: () => import('./demande/demande.module').then(m => m.DemandeModule) },
            { path: 'signalisation', loadChildren: () => import('./signalisation/signalisation.module').then(m => m.SignalisationModule) },
            { path: 'parametres', loadChildren: () => import('./parametres/parametres.module').then(m => m.ParametresModule) },
            { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
            { path: 'statistiques', loadChildren: () => import('./statistiques/statistiques.module').then(m => m.StatistiquesModule) },
            // { path: 'demande', component: NewComponent},
        ]
    },
    {
        path: '',
        component: BlankComponent,
        children: [
            {
                path: 'authentication',
                loadChildren:
                    () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            }
        ]
    },
    // { path: '', redirectTo: 'authentication/404' },
    {
        path: '**',
        redirectTo: 'authentication/404'
    }
];
