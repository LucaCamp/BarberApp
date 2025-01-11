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
  selectedServiceId: number | null = null;

  constructor(public prenotazioneService: PrenotazioneService) { }

  services = [
    { id: 1, name: 'Taglio' , },
    { id: 2, name: 'Barba' },
    { id: 3, name: 'Shampoo' }
  ];

  ngOnInit() {

  }

  
  onServiceSelect(serviceId: number) {
    this.prenotazioneService.selectedTime = undefined

    this.selectedServiceId = serviceId;
    this.formGroup.get('service_id')?.setValue(serviceId); // Imposta il valore nel form
  }
}
