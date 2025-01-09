import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { PrenotazioneService } from '../prenotazione.service';

@Component({
  selector: 'app-datatime-section',
  templateUrl: './datatime-section.component.html',
  styleUrls: ['./datatime-section.component.scss'],
  standalone: false
})
export class DatatimeSectionComponent implements OnInit {
  @Input() formGroup!: RxFormGroup;
  formattedSelectedDate: any
  loadedTimeGrid: boolean = true;
  timeGrid: any
  selectedTime: any

  constructor(private prenotazioneService: PrenotazioneService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() { }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is
     * from Tuesday (2) to Saturday (6)
     */
    return utcDay >= 2 && utcDay <= 6;
  };

  onDateChange(event: any) {
    this.loadedTimeGrid = false;
    const isoDate = event.detail.value;  // Ottieni il valore ISO 8601
    this.formattedSelectedDate = this.convertToYYYYMMDD(isoDate);  // Formatta la data come 'YYYY-MM-DD'
    this.prenotazioneService.prenotazione.start_date = this.formattedSelectedDate
    this.getTimeGrid()

  }

  convertToYYYYMMDD(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mese con due cifre
    const day = String(date.getDate()).padStart(2, '0');  // Giorno con due cifre
    return `${year}-${month}-${day}`;
  }

  getTimeGrid() {
    this.prenotazioneService.getTimeGrid(this.prenotazioneService.prenotazione.service_id, this.prenotazioneService.prenotazione.staff_id, this.formattedSelectedDate).subscribe(
      data => {
        this.timeGrid = data
        this.timeGrid = this.timeGrid.data
        this.loadedTimeGrid = true;
        this.cd.detectChanges();
      })
  }

  onTimeSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedTime = target.value;

    // Log current selected time
    console.log('Current value:', JSON.stringify(target.value));

    // Call the setEndTime function to calculate the end time
    this.prenotazioneService.prenotazione.start_date = this.formattedSelectedDate + " " + this.selectedTime
    // Log the updated end time
  }


}
