import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private AuthService :AuthService,
    private router:Router
  ){}
  canActivate():Promise<boolean>{
    return new Promise(resolve=>{
        this.AuthService.getAuth().onAuthStateChanged(user=>  {
          if (user) this.router.navigate(['home']);
          resolve(!user?true:false);
        });
    });
  }
  
}
