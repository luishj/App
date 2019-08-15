import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa:AngularFireAuth) { }
  login(user:User){ 
    return this.afa.auth.signInWithEmailAndPassword(user.email,user.password);
  }
  register(user:User){
    return this.afa.auth.createUserWithEmailAndPassword(user.email,user.password);
  }
  logout(){
    return this.afa.auth.signOut();
  }
  getAuth(){
    return this.afa.auth;
  }
}
