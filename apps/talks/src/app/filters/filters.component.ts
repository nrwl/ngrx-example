import { Component, EventEmitter, Output, Inject, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { createFiltersObject } from '../+state/talks.model';

@Component({
  selector: 'filters-cmp',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() filtersChange = new EventEmitter();

  @Input() set filters(v) {
    this.filtersForm.setValue(
      {
        title: v.title,
        speaker: v.speaker,
        highRating: v.minRating >= 9
      },
      { emitEvent: false }
    );
  }

  filtersForm = new FormGroup({
    speaker: new FormControl(),
    title: new FormControl(),
    highRating: new FormControl(false)
  });
  constructor() {
    this.filtersForm.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.filtersChange.next(createFiltersObject(value));
    });
  }
}
