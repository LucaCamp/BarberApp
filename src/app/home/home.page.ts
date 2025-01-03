import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  images = [
    {path:'assets/taglio_dai_barber_6.jpg'},
    {path:'assets/taglio_dai_barber_4.jpg'},
    {path:'assets/taglio_dai_barber_3.jpg'},
    {path:'assets/taglio_dai_barber_5.jpg'},
    {path:'assets/taglio_dai_barber_7.jpg'},
    {path:'assets/taglio_dai_barber_8.jpg'},
  ];

  constructor() { }


}
