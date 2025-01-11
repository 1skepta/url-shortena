import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-shorten',
  imports: [CommonModule, FormsModule],
  templateUrl: './shorten.component.html',
  styleUrl: './shorten.component.css',
})
export class ShortenComponent {
  linkInput: string = '';
  showError: boolean = false;
  results: Array<{ text: string; shortUrl: string; isCopied: boolean }> = [];

  async shortenLink() {
    if (!this.linkInput) {
      this.showError = true;
      return;
    }
    this.showError = false;
    try {
      const response = await axios.post(
        'https://corsproxy.io/https://cleanuri.com/api/v1/shorten',
        new URLSearchParams({ url: this.linkInput })
      );
      const shortUrl = response.data.result_url;

      this.results.push({ text: this.linkInput, shortUrl, isCopied: false });
      this.linkInput = '';
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  onInputChange() {
    if (this.linkInput) {
      this.showError = false;
    }
  }

  copyToClipboard(index: number) {
    navigator.clipboard.writeText(this.results[index].shortUrl);
    this.results[index].isCopied = true;

    setTimeout(() => {
      this.results[index].isCopied = false;
    }, 700);
  }
}
