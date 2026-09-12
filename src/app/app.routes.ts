import { Routes } from '@angular/router';

import { CounterPageComponent } from 'src/app/pages/counter/counter-page.component';
import { DragonballPageComponent } from 'src/app/pages/dragonball/dragonball.component';
import { HeroPageComponent } from 'src/app/pages/hero/hero-page.component';

export const routes: Routes = [
  { path: '', component: CounterPageComponent },
  { path: 'hero', component: HeroPageComponent },
  { path: 'dragonball', component: DragonballPageComponent },
];
