import { Component, computed, inject, signal } from '@angular/core';

import { Fixture } from '../../models/fixture';
import { FixtureService } from '../../services/fixture/fixture';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private fixtureService = inject(FixtureService);

  fixtures = signal<Fixture[]>([]);

  lastResult = computed(() => {
    const finishedMatches = this.fixtures().filter(
      (fixture) => fixture.status === 'FINISHED',
    );

    return finishedMatches.at(-1);
  });

  nextMatch = computed(() => {
    return this.fixtures().find(
      (fixture) => fixture.status === 'UPCOMING',
    );
  });

  constructor() {
    this.loadFixtures();
  }

  loadFixtures() {
    this.fixtureService.getFixtures().subscribe({
      next: (fixtures) => {
        this.fixtures.set(fixtures);
      },
      error: (error) => {
        console.error('Unable to load home fixtures:', error);
      },
    });
  }
}