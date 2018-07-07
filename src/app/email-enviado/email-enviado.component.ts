import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-email-enviado',
	templateUrl: './email-enviado.component.html',
	styleUrls: ['./email-enviado.component.css']
})
export class EmailEnviadoComponent implements OnInit {
	public email: string;

	constructor(
		private router: Router,
		private toastr: ToastrService
	) { }

	ngOnInit() {
		this.redirect();
		}
	redirect() {
		this.toastr.success(
			`Um link para redefinir sua senha foi enviado para o e-mail ${this.email}`, 'Email enviado!'
		);
		// this.router.navigate(['/login']);
	}

}
