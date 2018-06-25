import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpresaService } from '../service/empresa.service';
import { EmpresaDTO } from '../dto/empresa-dto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-empresa-add',
	templateUrl: './empresa-add.component.html',
	styleUrls: ['./empresa-add.component.css']
})

export class EmpresaAddComponent implements OnInit {
	form: FormGroup;
	isAdmin: Boolean = false;

	constructor(
		private empresaService: EmpresaService,
		private toastr: ToastrService,
		private router: Router,

	) { }

	ngOnInit() {
		this.form = new FormGroup({
			'nome': new FormControl('', [Validators.minLength(4), Validators.required]),
			'email': new FormControl('', [Validators.minLength(4), Validators.required, Validators.email]),
			'senha': new FormControl('', [Validators.required]),
			'empresa': new FormControl('', [Validators.minLength(4), Validators.required])
		});
	}

	onSubmit(form_user: EmpresaDTO) {
		if (this.isAdmin) {
			this.empresaService.cadastrarAdmin(form_user).subscribe(res => {
				this.toastr.success('Administrador cadastrado com Sucesso', 'Sucesso!');
				this.router.navigate(['/dashboardAdmin']);
			}, error => {
				console.log(error);
			}
			);
		} if (!this.isAdmin) {
			this.empresaService.cadastrarUser(form_user).subscribe(res => {
				this.toastr.success('Usuario cadastrado com Sucesso', 'Sucesso!');
				this.router.navigate(['/dashboardUser']);
			}, error => {
				console.log(error);
			}
			);
		}
	}

	get nome() {
		return this.form.get('nome');
	}


	get senha() {
		return this.form.get('senha');
	}
	get email() {
		return this.form.get('email');
	}
	get empresa() {
		return this.form.get('empresa');
	}


}

