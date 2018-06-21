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
			'codigoEmpresa': new FormControl('', [Validators.minLength(4), Validators.required])
		});
	}

	onSubmit(form_empresa: EmpresaDTO) {
		this.empresaService.cadastrar(form_empresa).subscribe(res => {
			this.toastr.success('Usuario cadastrado com Sucesso', 'Sucesso!');
			this.router.navigate(['/login']);
		}, error => {
			console.log(error);
		}
		);
	}

	get nome() {
		return this.form.get('nome');
	}


	get senha() {
		return this.form.get('senha');
	}


}

