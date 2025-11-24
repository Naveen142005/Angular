import { Routes } from '@angular/router';
import { AuthGuard } from '../auth';
import { BookResolver } from '../components/book-resolver';

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
    },
    {
        path: 'handsOn_3',
        loadComponent: () => import('../components/handson-3/handson-3').then(m => m.Handson3)
    },
      {
        path: 'books',
        loadComponent: () => import('../components/newbooklist').then(m => m.newBookListComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'add',
        loadComponent: () => import('../components/newaddbok').then(m => m.newAddBookComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('../components/newedit').then(m => m.newEditBookComponent),
        canActivate: [AuthGuard],
        resolve: {
        book: BookResolver
        }
    }
]
;
