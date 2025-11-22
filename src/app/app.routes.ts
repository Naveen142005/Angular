import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'handsOn_1',
        loadComponent: () => 
            import ('../components/handson-1/handson-1')
            .then(m => m.Handson1)
    }, 
    {
        path: '',
        loadComponent: () => 
            import('../components/welcome/welcome')
        .then(m => m.Welcome)
    },
    {
        path: 'handsOn_2',
        loadComponent: () => import ('../components/hands-on-2/hands-on-2').then(p => p.HandsOn2)
    }

]
;
