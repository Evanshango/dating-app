import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {User} from '../_models/user';
import {Observable, of} from 'rxjs';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {

  pageNumber = 1;
  pageSize = 12;
  likesParam = 'Likers'

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
      catchError(err => {
        console.log(err);
        this.alertify.error('Problem retrieving data')
        this.router.navigate(['/home']).then(() => {})
        return of(null)
      })
    )
  }
}
