import { Component, input } from '@angular/core';
import { Fixture } from '../../models/fixture';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fixture-card',
  imports: [DatePipe],
  templateUrl: './fixture-card.html',
  styleUrl: './fixture-card.css',
})
export class FixtureCard {
  fixture = input.required<Fixture>();
}
