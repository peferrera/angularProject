import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { RedefinirSenhaService } from '../service/redefinir-senha.service';
import { HttpClient } from '@angular/common/http';
import { EmailEnviadoComponent } from '../email-enviado/email-enviado.component';

@Component({
	selector: 'app-redefinir-senha',
	templateUrl: './redefinir-senha.component.html',
	styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {
	form: FormGroup;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private redefinirSenhaService: RedefinirSenhaService,
	) { }

	ngOnInit() {
		this.form = new FormGroup({
			'email': new FormControl('', [Validators.required, Validators.email])
		});

	}
	onSubmit(form_email: string) {
		this.redefinirSenhaService.recuperarSenha(form_email).subscribe(res => {
			this.toastr.success(
				`Um link para redefinir sua senha foi enviado para o e-mail ${ form_email }`, 'Email enviado!'
			);
			this.router.navigate(['/login']);
		}, error => {
			console.log(error);
		}
		);
	}
	get email() {
		return this.form.get('email');
	}
}
