import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselTransition', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '500ms ease',
          style({ opacity: 1, transform: 'scale(1)' })
        )
      ]),
      transition('* => void', [
        animate(
          '500ms ease',
          style({ opacity: 0, transform: 'scale(0.8)' })
        )
      ]),
    ])
  ]
})

export class CarouselComponent implements OnInit {
  @Input() slides: any
  currentSlide = 1;

  //icons
  faPrevious = faChevronLeft;
  faNext = faChevronRight;

  constructor() { }

  ngOnInit(): void {
  }

  previous() { 
    if(this.currentSlide < 1) {
      this.currentSlide = 1
    } else {
      this.currentSlide = this.currentSlide - 1
    } 
  }

  next() {
    if(this.currentSlide >= this.slides.length) {
      this.currentSlide = 1
    } else {
      this.currentSlide = this.currentSlide + 1
    }   
  }

}
