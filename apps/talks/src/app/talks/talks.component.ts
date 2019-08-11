import { Component, Input } from '@angular/core';
import { Talk } from '@ngrx-example/api-interfaces';

@Component({
  selector: 'talks-cmp',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent {
  @Input() talks: Talk[];
}
