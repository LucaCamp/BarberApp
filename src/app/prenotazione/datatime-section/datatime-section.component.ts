import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { PrenotazioneService } from '../prenotazione.service';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-datatime-section',
  templateUrl: './datatime-section.component.html',
  styleUrls: ['./datatime-section.component.scss'],
  standalone: false
})
export class DatatimeSectionComponent implements OnInit, AfterViewInit{
  loadedTimeGrid: boolean = true;
  timeGrid: any
  @Output()
  IsSelectedTime = new EventEmitter<any>()
  @ViewChild('timeSwiper')
  timeSwiper: ElementRef | undefined;
  timeGridError: boolean = false;

    constructor(public prenotazioneService: PrenotazioneService,
    private cd: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.timeSwiper && this.prenotazioneService.timeIndex) {
        console.log('Swiper instance found:', this.timeSwiper);
        this.timeSwiper?.nativeElement.swiper.slideTo(this.prenotazioneService.timeIndex, 0);
      } else {
        console.error("");
      }
    }, 1500);
  }

 
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
    this.prenotazioneService.selectedTime = undefined;
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
    this.timeGridError = false;
    this.loadedTimeGrid = false;
    this.prenotazioneService.getTimeGrid(this.prenotazioneService.prenotazione.service_id, this.prenotazioneService.prenotazione.staff_id, selectedDate).subscribe(
      data => {
        this.timeGrid = data
        this.timeGrid = this.timeGrid.data
        this.loadedTimeGrid = true;
        
        if (this.timeSwiper && this.prenotazioneService.timeIndex) {
          console.log('Swiper instance found:', this.timeSwiper);
          this.timeSwiper?.nativeElement.swiper.slideTo(this.prenotazioneService.timeIndex, 300, true);
        } else if(this.timeSwiper) {
          this.timeSwiper?.nativeElement.swiper.slideTo(1, 300, true);
        }else{
          console.error("si è verificato un errore durante il caricamento dello swiper")
        }
        },
        (      error: any) => {
          // Se si verifica un errore
          console.error('Errore durante il caricamento della griglia degli orari:', error);
          this.loadedTimeGrid = true;
          this.timeGridError = true; // Imposta il flag di errore
          this.timeGrid = []; // In caso di errore, assicuriamoci che la griglia sia vuota
        }
      )
      
  }

  onTimeSelect(time: string, index: any): void {
    if (this.timeGrid.find((t: { start_time: string; free: string; }) => t.start_time === time && t.free === 'Y')) {
      this.prenotazioneService.timeIndex = index
      this.prenotazioneService.selectedTime = time;
      this.IsSelectedTime.emit(this.prenotazioneService.selectedTime);
      console.log('Selected time:', time);
    }
  }
  


}
