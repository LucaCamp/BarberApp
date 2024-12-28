import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { Appointment } from 'src/app/model/appointment.model';

@Component({
  selector: 'app-form-prenotazione',
  templateUrl: './form-prenotazione.component.html',
  styleUrls: ['./form-prenotazione.component.scss'],
  standalone: false,
})
export class FormPrenotazioneComponent implements OnInit {
  nextSection: boolean = false;
  prenotazioneForm: RxFormGroup;
  prenotazione = new Appointment();
  constructor(
    private formBuilder: RxFormBuilder,
    private router: Router
  ) {
    Object.setPrototypeOf(this.prenotazione, Appointment.prototype);
    this.prenotazioneForm = <RxFormGroup>this.formBuilder.formGroup(this.prenotazione);
  }

  ngOnInit() { }

  goBack() {
    if (this.nextSection) {
      this.nextSection = false;
    } else {
      this.router.navigate(["home"])
    }
  }

  showNextSection() {
    this.nextSection = true;

  }

  submitAppointment() {
    console.log(this.prenotazione)
  }
}

