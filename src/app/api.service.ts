import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlBase = 'https://rickandmortyapi.com/api';
  constructor(private http: HttpClient) {}

  getCharacters() {
    return this.http.get(`${this.urlBase}/character`);
  }
}
