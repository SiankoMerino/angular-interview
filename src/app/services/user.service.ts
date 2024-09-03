import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserAdapter } from '@app/adapters';
import { IUser, UserInfo } from '@app/models';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private readonly baseUrl = 'https://reqres.in/api/users';
_http = inject(HttpClient)

getAllUsers():Observable<IUser[]> {
  return this._http.get<UserInfo>(this.baseUrl).pipe(map(info => UserAdapter(info)));
}

addUser(user: Omit<IUser, "id">): Observable<void> {
  return this._http.post<void>(this.baseUrl, { user }).pipe(
    catchError(() => {
      console.info("error prevented for testing")
      return Promise.resolve()
    })
  )
}

removeUser(id: number): Observable<void> {
  const url = `${this.baseUrl}/delete/${id}`
  return this._http.delete<void>(url).pipe(
    catchError(() => {
      console.info("error prevented for testing")
      return Promise.resolve();
    })
  )
}

updateUser(user: IUser): Observable<void> {
  return this._http.put<void>(this.baseUrl, { user }).pipe(
    catchError(() => {
      console.info("error prevented for testing")
      return Promise.resolve();
    })
  )
}

}
