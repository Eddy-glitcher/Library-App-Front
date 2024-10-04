import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private readonly _httpClient = inject(HttpClient);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _apiUrl : string = environment.api_url;

  public logIn(email : string, password : string): Observable<LoginResponse>{
    const body = { email, password };
    const apiBaseUrl : string = `${this._apiUrl}/auth/login`;

    return this._httpClient.post<LoginResponse>(apiBaseUrl, body )
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      map((resp : LoginResponse)=> resp ),
      catchError( (error: HttpErrorResponse)=> throwError( ()=> error.error) )
    )
  }

}
