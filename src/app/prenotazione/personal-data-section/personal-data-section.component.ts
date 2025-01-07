import { Component, Input, OnInit } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-personal-data-section',
  templateUrl: './personal-data-section.component.html',
  styleUrls: ['./personal-data-section.component.scss'],
  standalone: false,
})
export class PersonalDataSectionComponent implements OnInit {
  @Input() formGroup!: RxFormGroup;

  constructor() { }

  ngOnInit() { }

}
