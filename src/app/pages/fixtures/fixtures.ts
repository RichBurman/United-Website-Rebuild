import { Component, inject } from '@angular/core';
import { FixtureService } from '../../services/fixture';
import { FixtureCard } from '../../components/fixture-card/fixture-card';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-fixtures',
  imports: [AsyncPipe, FixtureCard],
  templateUrl: './fixtures.html',
  styleUrl: './fixtures.css',
})
export class Fixtures {
  private fixtureService = inject(FixtureService);

  fixtures$ = this.fixtureService.getFixtures();
}
