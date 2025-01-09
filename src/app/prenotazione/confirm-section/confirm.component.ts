import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../model/appointment.model';
import { PrenotazioneService } from '../prenotazione.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  standalone: false
})
export class ConfirmComponent implements OnInit {
  prenotazione: Appointment;
  isLoadingSubmit: boolean = false;

  constructor(private prenotazioneService: PrenotazioneService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.prenotazione = this.prenotazioneService.prenotazione
  }

  ngOnInit() {
    // this.prenotazioneService.prenotazione.start_date = this.prenotazioneService.formattedSelectedDate + ' ' + this.prenotazioneService.selectedTime
    this.prenotazione = this.prenotazioneService.prenotazione
    console.log(this.prenotazione)
  }

  submitAppointment() {
    this.isLoadingSubmit = true;
    this.prenotazioneService.createAppointment(this.prenotazione).subscribe({
      next: (response) => {
        // Successo: Mostra un messaggio di conferma
        this.showConfirmationAlert('Prenotazione confermata', 'La tua prenotazione è stata effettuata con successo.');
        this.isLoadingSubmit = false;
      },
      error: (error) => {
        // Errore: Mostra un messaggio di errore
        this.showConfirmationAlert('Errore', 'Si è verificato un errore durante la prenotazione. Riprova più tardi.');
        console.error('Errore durante la creazione della prenotazione:', error);
        this.isLoadingSubmit = false;
      }
    }
    )
  }

  async showConfirmationAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  goBack() {
    this.router.navigate(['prenota']);
  }
}
