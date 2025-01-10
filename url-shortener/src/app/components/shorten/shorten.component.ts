import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shorten',
  imports: [CommonModule, FormsModule],
  templateUrl: './shorten.component.html',
  styleUrl: './shorten.component.css',
})
export class ShortenComponent {
  linkInput: string = '';
  showError: boolean = false;

  shortenLink() {
    if (!this.linkInput) {
      this.showError = true;
    } else {
      this.showError = false;
    }
  }

  onInputChange() {
    if (this.linkInput) {
      this.showError = false;
    }
  }
}
