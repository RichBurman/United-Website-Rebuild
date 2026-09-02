import { Component, inject } from '@angular/core';
import { FixtureService } from '../../services/fixture';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-fixtures',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './fixtures.html',
  styleUrl: './fixtures.css',
})
export class Fixtures {
  private fixtureService = inject(FixtureService);

  fixtures$ = this.fixtureService.getFixtures();
}
