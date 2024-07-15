import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from './character';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlBase = 'https://rickandmortyapi.com/api/character';
  constructor(private http: HttpClient) {}

  getCharacters() {
    return this.http.get(`${this.urlBase}`);
  }

  getRandomCharacter(): Observable<Character> {
    const randomId = Math.floor(Math.random() * 826) + 1;
    return this.http.get<Character>(`${this.urlBase}/${randomId}`);
  }
}
