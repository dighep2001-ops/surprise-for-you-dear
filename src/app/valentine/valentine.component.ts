import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-valentine',
  standalone: true,
  imports: [],
  templateUrl: './valentine.component.html',
  styleUrl: './valentine.component.css',
  host: { class: 'valentine-host', '[class.said-yes]': 'saidYes' }
})
export class ValentineComponent {
  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  saidYes = false;
  noClickCount = 0;
  noButtonLeft = 50;
  noButtonTop = 50;
  noMessages = [
    'Think again 😏✨',
    'Are you really sure? 🤭💕',
    'Your heart already said yes 💖💫',
    "Don't make me ask again 😌🌸",
    'Okay.... As your wish 😉❤️🔥'
  ];
  heartCount = Array.from({ length: 96 }, (_, i) => i);

  /** Public folder is served at root */
  musicUrl: SafeResourceUrl;
  heartVideoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.musicUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/Edd_Sheeran_-_Perfect_(mp3.pm).mp3');
    this.heartVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/x-large-vecteezy_glowing-white-hearts-particle-fade-bokeh-floating-loop_2260473_x-large.mp4');
  }

  /** Size multiplier for hearts (0.35–1) for varied sizes like the reference */
  getHeartSize(i: number): number {
    return 0.35 + ((i * 7 + 11) % 13) / 13;
  }

  onNo(): void {
    if (this.noClickCount < this.noMessages.length) {
      this.noClickCount++;
    }
  }

  get currentNoMessage(): string {
    const index = Math.min(this.noClickCount - 1, this.noMessages.length - 1);
    return index >= 0 ? this.noMessages[index] : '';
  }

  /** After 5th message, move No button away when she hovers so she can't click it */
  moveNoButton(event?: MouseEvent): void {
    if (this.noClickCount < this.noMessages.length) return;
    const min = 5;
    const max = 95;
    let left: number;
    let top: number;
    // Pick a random position anywhere on the full screen (entire viewport)
    left = min + Math.random() * (max - min);
    top = min + Math.random() * (max - min);
    // If we have cursor position, avoid placing right under it (min 20% away)
    if (event && typeof window !== 'undefined') {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cursorXPercent = (event.clientX / vw) * 100;
      const cursorYPercent = (event.clientY / vh) * 100;
      const margin = 20;
      let tries = 0;
      while (
        Math.abs(left - cursorXPercent) < margin &&
        Math.abs(top - cursorYPercent) < margin &&
        tries++ < 15
      ) {
        left = min + Math.random() * (max - min);
        top = min + Math.random() * (max - min);
      }
    }
    this.noButtonLeft = left;
    this.noButtonTop = top;
  }

  onYes(): void {
    // Play audio immediately while still in the user gesture (click) so browsers allow it
    const audio = this.bgMusic?.nativeElement;
    if (audio) {
      audio.volume = 0.8;
      audio.muted = false;
      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          audio.load();
          audio.play().catch(() => {});
        });
      }
    }
    this.saidYes = true;
    // Start background video after view updates
    setTimeout(() => this.bgVideo?.nativeElement?.play(), 50);
  }
}
