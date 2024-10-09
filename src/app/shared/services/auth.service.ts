import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private readonly _httpClient = inject(HttpClient);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _apiUrl : string = environment.api_url;

  public logIn(email : string, password : string): Observable<AuthResponse>{
    const body = { email, password };
    const apiBaseUrl : string = `${this._apiUrl}/auth/login`;

    return this._httpClient.post<AuthResponse>(apiBaseUrl, body )
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      map((resp : AuthResponse)=> resp ),
      catchError( (error: HttpErrorResponse)=> throwError( ()=> error.error) )
    )
  }

  public register(name : string, email : string, password : string): Observable<AuthResponse>{
    const apiBaseUrl : string = `${this._apiUrl}/auth/register`;

    const body = {name, email, password};

    return this._httpClient.post<AuthResponse>(apiBaseUrl, body)
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      map((resp : AuthResponse)=> resp),
      catchError((error : HttpErrorResponse)=> throwError(()=> error.error))
    )
  }
}
