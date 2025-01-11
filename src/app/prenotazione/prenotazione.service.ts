import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PrenotazioneService {
    appEndpoint = "https://daibarber.it/wp-json/customappointment/v1/create_app"
    timeGridEndpoint = "https://daibarber.it/wp-json/customappointment/v1/get_timegrid"

    prenotazione = new Appointment()
    selectedTime: any;
    selectedDate: any
    formattedSelectedDate!: any;
  timeIndex: any;

    constructor(private http: HttpClient) {
    }

    getTimeGrid(serviceId: number, staffId: number, date: any) {
        return this.http.get(
            `${this.timeGridEndpoint}?serviceId=${serviceId}&staffId=${staffId}&date=${date}`
        )
    }

    createAppointment(app: Appointment) {
        app.start_date = this.formattedSelectedDate + ' ' + this.selectedTime
        console.log('Dati inviati: ', app)
        return this.http.
            post(this.appEndpoint, app, {
                observe: 'response',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .pipe(
                tap((responseData) => {
                    console.log(responseData);
                    switch (responseData.status) {
                        case 200:
                            console.log('Prenotazione confermata');
                            break;
                        case 201:
                            console.log('Prenotazione confermata');
                            break;
                        default:
                            console.log('');
                    }
                }),
                catchError((err: HttpErrorResponse) => {
                    console.log(err);
                    let error;
                    switch (err.status) {
                        case 400:
                            error = 'Dati inseriti non validi';
                            break;
                        case 500:
                            error =
                                'Si è verificato un errore interno al server';
                            break;
                        default:
                            error = 'Si è verificato un errore sconosciuto';
                    }
                    return throwError(() => error);
                })
            );
    }
}

