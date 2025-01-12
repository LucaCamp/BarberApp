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
  selectedBarberId: number | undefined;

  constructor(public prenotazioneService: PrenotazioneService) { }

  services = [
    { id: 1, name: 'Taglio' , price: '12€'},
    { id: 2, name: 'Barba', price: '5€' },
    { id: 3, name: 'Shampoo', price: '4,5€' }
  ];

// Lista dei parrucchieri
barbers = [
  { id: 3, name: 'Vincenzo Daì' },
];

  ngOnInit() {

  }

  
  onServiceSelect(serviceId: number) {
    this.prenotazioneService.selectedTime = undefined

    this.selectedServiceId = serviceId;
    this.formGroup.get('service_id')?.setValue(serviceId); // Imposta il valore nel form
  }

  onBarberSelect(barberId: number) {
    this.selectedBarberId = barberId;
    this.formGroup.get('staff_id')?.setValue(barberId); // Imposta il valore nel form
  }
}
