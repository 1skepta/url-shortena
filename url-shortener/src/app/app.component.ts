import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, BodyComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'url-shortener';

  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('SHORTLY URL SHORTENER');
  }
}
