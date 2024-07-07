import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = environment.title;

  constructor(private api: ApiService) {}

  getCharacter() {
    console.log(this.api.getCharacters());

    return this.api.getCharacters();
  }
}
