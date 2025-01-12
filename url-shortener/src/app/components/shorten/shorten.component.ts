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
    const textToCopy = this.results[index].shortUrl;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          this.results[index].isCopied = true;
          setTimeout(() => {
            this.results[index].isCopied = false;
          }, 700);
        })
        .catch((err) => {
          console.error('Failed to copy text:', err);
        });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        console.log('Fallback: Text copied to clipboard');
        this.results[index].isCopied = true;
        setTimeout(() => {
          this.results[index].isCopied = false;
        }, 700);
      } catch (err) {
        console.error('Fallback: Failed to copy text:', err);
      }
      document.body.removeChild(textarea);
    }
  }
}
