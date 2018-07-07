import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { DashboardAdminComponent } from '../dashboard-admin/dashboard-admin.component';
import { EmpresaService } from '../service/empresa.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	usuarioLogado: any;
	codEmpresa: string;
	faUser = this.faUser;


	constructor(
		private authservice: AuthService,
		private router: Router,
		private usuarioService: EmpresaService
	) { }
	buscarUser() {
		this.usuarioService.buscarUser().subscribe(user => {
			this.usuarioLogado = user;
			console.log(this.usuarioLogado);

		});
	}

	ngOnInit() {
	}
	logout() {
		this.authservice.logout();
		this.router.navigate(['/login']);
	}
}
