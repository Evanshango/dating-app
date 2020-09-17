import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png')
  currentPhotoUrl = this.photoUrl.asObservable()

  constructor(private http: HttpClient) {}

  changedMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl)
  }

  login(model: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('meet_up_token', user.token);
          localStorage.setItem('meet_up_user', JSON.stringify(user.user))
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user
          this.changedMemberPhoto(this.currentUser.photoUrl)
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, model);
  }

  loggedIn() {
    const token = localStorage.getItem('meet_up_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
