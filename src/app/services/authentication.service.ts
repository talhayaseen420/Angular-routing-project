import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  api = environment.jsonApi
  constructor(private router: Router, private http:HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return JSON.parse(localStorage.getItem('access_token')!);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  // login({ email, password }: any): Observable<any> {
  //   if (email === 'talha@gmail.com' && password === 'talha123') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     return of({ name: 'Talha Yaseen', email: 'talha@gmail.com' });
  //   }
  //   return throwError(new Error('Failed to login'));
  // }

  login(item: any): Observable<any> {
    const post = this.api + 'users/login/'
    return this.http.post(post,item)
  }
  getVal(){
    const get = this.api + 'mobile/venue/business-details/?offset=0&limit=12'
    return this.http.get(get)
  }

  forgotPassword(email:any){
    const forgot = this.api + 'users/forgot-password/'
    return this.http.post(forgot,email)
  }
}
