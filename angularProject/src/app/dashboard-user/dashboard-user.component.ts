import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReembolsoService } from '../service/reembolso.service';
import { Router } from '@angular/router';
import { ReembolsoDTO } from '../dto/reembolso-dto';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { EmpresaService } from '../service/empresa.service';


@Component({
	selector: 'app-dashboard-user',
	templateUrl: './dashboard-user.component.html',
	styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
	isModalActive = false;
	formReembolso: FormGroup;
	public categorias: any = [];
	role: any;
	faCalendarAlt = faCalendarAlt;


	constructor(
		private router: Router,
		private reembolsoService: ReembolsoService,
		private empresaService: EmpresaService
	) { }

	ngOnInit() {

		this.empresaService.getRole().subscribe(res => {
			this.role = res;
			console.log(this.role);
		});

		this.reembolsoService.buscarCategorias().subscribe(res => {
			console.log(this.categorias);
			this.categorias = res;
			console.log(this.categorias);
		});
		console.log(this.categorias);

		this.formReembolso = new FormGroup({
			'nome': new FormControl('', [Validators.minLength(4), Validators.required]),
			'categoria': new FormControl('', Validators.required),
			'valorSolicitado': new FormControl('', Validators.required),
			'data': new FormControl('', Validators.required),
			'uploadUrl': new FormControl(null, Validators.required)
		});
	}

	toggleModal() {
		this.isModalActive = !this.isModalActive;
	}
	onSubmit(reembolso: ReembolsoDTO) {
		this.reembolsoService.addReembolso(reembolso).subscribe((res) => {
			console.log(reembolso);
		}, error => {
			console.log(error);
		});

	}
	get nome() {
		return this.formReembolso.get('nome');
	}
	get categoria() {
		return this.formReembolso.get('categoria');
	}
	get valorSolicitado() {
		return this.formReembolso.get('ValorSolicitado');
	}
	get uploadUrl() {
		return this.formReembolso.get('uploadUrl');
	}
	get data() {
		return this.formReembolso.get('data');
	}
}
