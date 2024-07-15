import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { Character } from './character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  character!: Character;
  lastDrawTime!: number;
  canDraw: boolean = true;
  drawnCharacters: Set<number> = new Set();
  title = environment.title;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const storedTime = localStorage.getItem('lastDrawTime');
    const storedCharacters = localStorage.getItem('drawnCharacters');
    if (storedTime) {
      this.lastDrawTime = parseInt(storedTime, 10);
      this.checkDrawAvailability();
    }
    if (storedCharacters) {
      this.drawnCharacters = new Set(JSON.parse(storedCharacters));
    }
  }

  drawCharacter(): void {
    if (!this.canDraw) return;

    this.fetchNewCharacter();
  }

  fetchNewCharacter(): void {
    this.api.getRandomCharacter().subscribe((character) => {
      if (this.drawnCharacters.has(character.id)) {
        // If character is already drawn, fetch another one
        this.fetchNewCharacter();
      } else {
        this.character = character;
        this.drawnCharacters.add(character.id);
        localStorage.setItem('lastDrawTime', Date.now().toString());
        localStorage.setItem(
          'drawnCharacters',
          JSON.stringify(Array.from(this.drawnCharacters))
        );
        this.canDraw = false;
        setTimeout(() => (this.canDraw = true), 2 * 60 * 60 * 1000); // 2 hours
      }
    });
  }

  checkDrawAvailability(): void {
    const currentTime = Date.now();
    if (currentTime - this.lastDrawTime >= 2 * 60 * 60 * 1000) {
      this.canDraw = true;
    } else {
      this.canDraw = false;
      const remainingTime =
        2 * 60 * 60 * 1000 - (currentTime - this.lastDrawTime);
      setTimeout(() => (this.canDraw = true), remainingTime);
    }
  }

  getCharacter() {
    console.log(this.api.getCharacters());

    return this.api.getCharacters();
  }
}
