import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  constructor(private router: Router, private usuarioService: UsuarioService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.usuarioService.validarTokenAdmin().pipe(
        tap(resp => {
          
          if(!resp){
            this.router.navigateByUrl('/login')
          }
        }
        )
      )
  }
  
}
