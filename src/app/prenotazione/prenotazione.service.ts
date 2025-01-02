import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {
appEndpoint = "https://daibarber.it/wp-json/customappointment/v1/create_app"

  constructor(private http: HttpClient) {
   }

   createAppointment(app: Appointment){
    console.log('Dati inviati: ', app)
   return this.http.
   post(this.appEndpoint, app, { observe: 'response', 
    headers: {
         'Content-Type': 'application/json'
    }
   })
   .pipe(
    tap((responseData) => {
        console.log(responseData);
        switch (responseData.status) {
            case 200:
                console.log('Utente loggato');
                break;
            default:
                console.log('entro quà');
        }
    }),
    catchError((err: HttpErrorResponse) => {
        console.log(err);
        let error;
        switch (err.status) {
            case 400:
                error = 'Dati inseriti non validi';
                break;
            case 403:
                error = 'Nome utente o password errati';
                break;
            case 404:
                error = 'Nome utente o password non trovati';
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

