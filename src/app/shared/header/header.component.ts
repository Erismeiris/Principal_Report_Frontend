import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  logout() {
    Swal.fire({
      title: 'Logout',
      text: 'Sesión cerrada',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      localStorage.removeItem('tokenSchool');
      localStorage.removeItem('adminToken');
      this.router.navigateByUrl('/login');
    })
  }


}
