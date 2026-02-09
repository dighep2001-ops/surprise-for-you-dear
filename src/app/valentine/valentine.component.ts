import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-valentine',
  standalone: true,
  imports: [],
  templateUrl: './valentine.component.html',
  styleUrl: './valentine.component.css'
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
    'Okay… now press YES 😉❤️🔥'
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
  moveNoButton(): void {
    if (this.noClickCount < this.noMessages.length) return;
    this.noButtonLeft = 10 + Math.random() * 75;
    this.noButtonTop = 10 + Math.random() * 75;
  }

  onYes(): void {
    this.saidYes = true;
    const audio = this.bgMusic?.nativeElement;
    if (audio) {
      audio.volume = 0.8;
      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          audio.load();
          audio.play().catch(() => {});
        });
      }
    }
    // Start background video after view updates
    setTimeout(() => this.bgVideo?.nativeElement?.play(), 50);
  }
}
