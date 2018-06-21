import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	constructor(
		private authservice: AuthService,
		private router: Router,
	) { }

	ngOnInit() {
	}
	logout() {
		this.authservice.logout();
		this.router.navigate(['/login']);
	}
}
