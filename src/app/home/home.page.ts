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

  services = [
    { id: 1, name: 'Taglio', price: 12, icon: 'cut-outline' },
    { id: 2, name: 'Barba', price: 12, icon: 'male-outline' },
    { id: 3, name: 'Shampoo', price: 12, icon: 'water-outline' },
    { id: 4, name: 'Pulizia del viso', price: 12, icon: 'happy-outline' }
  ];

  constructor() { }


}
