import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalGuard {

    constructor(private userService: UsuarioService, private router: Router) { }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot) {
        return this.userService.validarToken().pipe(
          tap(resp => {
            
            if(!resp){
              this.router.navigateByUrl('/login')
            }
          }
          )
        )
          
    }
}

