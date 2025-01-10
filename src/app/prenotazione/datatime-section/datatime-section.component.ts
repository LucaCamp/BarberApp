import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { PrenotazioneService } from '../prenotazione.service';

@Component({
  selector: 'app-datatime-section',
  templateUrl: './datatime-section.component.html',
  styleUrls: ['./datatime-section.component.scss'],
  standalone: false
})
export class DatatimeSectionComponent implements OnInit {
  loadedTimeGrid: boolean = true;
  timeGrid: any
  @Output()
  IsSelectedTime = new EventEmitter<any>()


  constructor(public prenotazioneService: PrenotazioneService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    if (this.prenotazioneService.selectedDate) {
      this.prenotazioneService.formattedSelectedDate = this.convertToYYYYMMDD(this.prenotazioneService.selectedDate)
      this.getTimeGrid(this.prenotazioneService.formattedSelectedDate)
    } else {
      const today = new Date();
      const isoDate = today.toISOString().split('T')[0];
      const formattedToday = this.convertToYYYYMMDD(today.toISOString());
      this.prenotazioneService.selectedDate = today;
      this.prenotazioneService.formattedSelectedDate = formattedToday;
      this.getTimeGrid(formattedToday)

    }

     }

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
    this.prenotazioneService.selectedDate = event.detail.value
    this.prenotazioneService.formattedSelectedDate = this.convertToYYYYMMDD(this.prenotazioneService.selectedDate);  // Formatta la data come 'YYYY-MM-DD'
    this.getTimeGrid(this.prenotazioneService.formattedSelectedDate)
  }

  convertToYYYYMMDD(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mese con due cifre
    const day = String(date.getDate()).padStart(2, '0');  // Giorno con due cifre
    return `${year}-${month}-${day}`;
  }

  getTimeGrid(selectedDate: string) {
    this.loadedTimeGrid = false;
    this.prenotazioneService.getTimeGrid(this.prenotazioneService.prenotazione.service_id, this.prenotazioneService.prenotazione.staff_id, selectedDate).subscribe(
      data => {
        this.timeGrid = data
        this.timeGrid = this.timeGrid.data
        this.loadedTimeGrid = true;
        this.cd.detectChanges();
      })
  }

  onTimeSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.prenotazioneService.selectedTime = target.value;
    this.IsSelectedTime.emit(this.prenotazioneService.selectedTime)
    // Log current selected time
    console.log('Current value:', JSON.stringify(target.value));

  }


}
