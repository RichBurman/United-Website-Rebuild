import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Fixtures } from './pages/fixtures/fixtures';
import { Players } from './pages/players/players';
import { PlayerProfile } from './pages/player-profile/player-profile';
import { LeagueTable } from './pages/league-table/league-table';
import { Blog } from './pages/blog/blog';
import { BlogPost } from './pages/blog-post/blog-post';
import { Admin } from './pages/admin/admin';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'fixtures',
    component: Fixtures,
  },
  {
    path: 'results',
    redirectTo: 'fixtures',
    pathMatch: 'full',
  },
  {
    path: 'players',
    component: Players,
  },
  {
    path: 'players/:id',
    component: PlayerProfile,
  },
  {
    path: 'league-table',
    component: LeagueTable,
  },
  {
    path: 'blog',
    component: Blog,
  },
  {
    path: 'blog/:id',
    component: BlogPost,
  },
  {
    path: 'admin',
    component: Admin,
  },
  {
    path: '**',
    component: NotFound,
  },
];;
