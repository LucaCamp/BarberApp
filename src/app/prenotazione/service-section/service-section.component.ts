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

  services: any[] = [];
  barbers: any[] = [];
  isLoadingServices = true;  // Variabile per il caricamento dei servizi
  isLoadingBarbers = true;   // Variabile per il caricamento dei barbieri

  ngOnInit() {
    this.loadServices();
    this.loadStaff();
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

  // Carica i servizi dal servizio
  loadServices() {
    this.prenotazioneService.getServices().subscribe({
      next: (response: any) => {
        this.services = response.data;
        this.isLoadingServices = false;  // Imposta false al termine del caricamento

      },
      error: (error) => {
        console.error('Errore nel recupero dei servizi', error);
      }
    });
  }

  // Carica lo staff dal servizio
  loadStaff() {
    this.prenotazioneService.getStaff().subscribe({
      next: (response: any) => {
        this.barbers = response.data;
        this.isLoadingBarbers = false;  // Imposta false al termine del caricamento

      },
      error: (error) => {
        console.error('Errore nel recupero dello staff', error);
      }
    });
  }
}

