import { Component } from '@angular/core';
import { ShortenComponent } from '../shorten/shorten.component';

@Component({
  selector: 'app-body',
  imports: [ShortenComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {}
