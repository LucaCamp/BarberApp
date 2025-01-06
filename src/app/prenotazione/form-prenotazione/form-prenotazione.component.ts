import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { Appointment } from 'src/app/model/appointment.model';
import { PrenotazioneService } from '../prenotazione.service';
import { AlertController } from '@ionic/angular';
// interfaccia per dati radiopoint dinamici 
interface Time {
  start_time: string,
  end_time: string,
  free: string
}

@Component({
  selector: 'app-form-prenotazione',
  templateUrl: './form-prenotazione.component.html',
  styleUrls: ['./form-prenotazione.component.scss'],
  standalone: false,
})

export class FormPrenotazioneComponent implements OnInit {
  currentSection: number = 1;
  prenotazioneForm: RxFormGroup;
  prenotazione = new Appointment();
  timeGrid: any
  selectedTime: any
  formattedSelectedDate: any
  endTime: string = '';
  loadedTimeGrid: boolean = true;

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: RxFormBuilder,
    private router: Router,
    private prenotazioneService: PrenotazioneService,

  ) {
    Object.setPrototypeOf(this.prenotazione, Appointment.prototype);
    this.prenotazioneForm = <RxFormGroup>this.formBuilder.formGroup(this.prenotazione);
  }
  ngOnInit() {

  }

  getServiceDuration(): number {
    const serviceId = Number(this.prenotazione.service_id)
    switch (serviceId) {
      case 1:
        return 30
      case 2:
        return 15
      case 3:
        return 15
      default:
        console.log(typeof (this.prenotazione.service_id))
        return 17
    }
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedTime = target.value;

    // Log current selected time
    console.log('Current value:', JSON.stringify(target.value));

    // Call the setEndTime function to calculate the end time
    this.endTime = this.setEndTime(target.value);

    // Log the updated end time
    console.log('End time):', this.endTime);
  }

  setEndTime(selectedTime: string): string {
    this.prenotazione.service_id = Number(this.prenotazione.service_id)
    // Parsing the selected time string (e.g. "09:30:00") to a Date object
    const selectedTimeDate = new Date();
    const [hours, minutes, seconds] = selectedTime.split(':').map(Number);

    // Set the time of selectedTimeDate based on the selected value
    selectedTimeDate.setHours(hours, minutes, seconds || 0);

    // Clone the Date object to avoid mutating the original time
    const endTimeDate = new Date(selectedTimeDate);

    // Adjust time based on serviceId
    endTimeDate.setMinutes(endTimeDate.getMinutes() + this.getServiceDuration());

    // Format the updated time back to a string in "HH:MM:SS" format
    return endTimeDate.toTimeString().split(' ')[0]; // Take only the "HH:MM:SS" part
  }

  //
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is
     * from Tuesday (2) to Saturday (6)
     */
    return utcDay >= 2 && utcDay <= 6;
  };

  setEndDate() {
    this.prenotazione.end_date = this.prenotazione.start_date + ' ' + this.endTime
  }

  setFullName() {
    this.prenotazione.full_name = this.prenotazione.first_name + " " + this.prenotazione.last_name;
  }
  onDateChange(event: any) {
    this.loadedTimeGrid = false;
    const isoDate = event.detail.value;  // Ottieni il valore ISO 8601
    this.formattedSelectedDate = this.convertToYYYYMMDD(isoDate);  // Formatta la data come 'YYYY-MM-DD'
    this.prenotazione.start_date = this.formattedSelectedDate
    this.getTimeGrid()

  }

  convertToYYYYMMDD(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mese con due cifre
    const day = String(date.getDate()).padStart(2, '0');  // Giorno con due cifre
    return `${year}-${month}-${day}`;
  }

  goBack() {
    if (this.currentSection > 1) {
      this.currentSection -= 1
    } else if (this.currentSection === 1) {
      this.router.navigate(['home'])
    }
  }

  showNextSection() {
    if (this.currentSection < 3) {
      this.currentSection += 1;
      console.log(this.prenotazione.service_id)
      return;
    }
    if (this.currentSection === 3) {
      this.setFullName()
      this.setEndDate()
      this.prenotazione.start_date = this.formattedSelectedDate + " " + this.selectedTime
      console.log(this.prenotazione.start_date + ' ' + this.prenotazione.end_date)
      this.prenotazioneService.prenotazione = this.prenotazione
      this.router.navigate(['prenota/riepilogo'])
    }
  }

  getTimeGrid() {
    this.prenotazioneService.getTimeGrid(this.prenotazione.service_id, this.prenotazione.staff_id, this.formattedSelectedDate).subscribe(
      data => {
        this.timeGrid = data
        this.timeGrid = this.timeGrid.data
        this.loadedTimeGrid = true;
        this.cd.detectChanges();
      })
  }

}

