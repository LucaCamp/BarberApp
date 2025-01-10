import { Component, Input, OnInit } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { PrenotazioneService } from '../prenotazione.service';

@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrls: ['./service-section.component.scss'],
  standalone: false,
})
export class ServiceSectionComponent implements OnInit {
  @Input() formGroup!: RxFormGroup;
  constructor(private prenotazioneService: PrenotazioneService) { }

  ngOnInit() {

  }

  onServiceSelect(service:any){
    this.prenotazioneService.selectedTime = undefined
  }
}
