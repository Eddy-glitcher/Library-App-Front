import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../interfaces/user';
import { AuthStatus } from '../interfaces/auth-status.enum';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private readonly _httpClient = inject(HttpClient);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _apiUrl : string = environment.api_url;

  private readonly _currentUser = signal<User|null>(null);
  public currentUser = computed(()=> this._currentUser());
  
  private readonly _authStatus = signal<AuthStatus>(AuthStatus.checking);
  public readonly authStatus = computed(()=> this._authStatus());

  private _setAuthentication(user : User, token : string){
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  public logIn(email : string, password : string): Observable<boolean>{
    const body = { email, password };
    const apiBaseUrl : string = `${this._apiUrl}/auth/login`;

    return this._httpClient.post<AuthResponse>(apiBaseUrl, body )
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      map((resp : AuthResponse)=> this._setAuthentication(resp.user, resp.token)),
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
