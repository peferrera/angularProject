import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReembolsoService } from '../service/reembolso.service';
import { Router } from '@angular/router';
import { ReembolsoDTO } from '../dto/reembolso-dto';
import { Observable } from 'rxjs';
import { CategoriaDTO } from '../dto/categoria-dto';

@Component({
	selector: 'app-dashboard-admin',
	templateUrl: './dashboard-admin.component.html',
	styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
	isModalActive = false;
	formReembolso: FormGroup;
	public categorias: any = [];
	public reembolsos: any = [];
	reembolsoSelecionado: any;
	nome: string;
	valor: number;
	data: string;
	categoria: string;
	emailEmpregado: string;



	constructor(
		private router: Router,
		private reembolsoService: ReembolsoService,
	) { }

	toggleModal() {
		this.isModalActive = !this.isModalActive;
	}
	cleanModal(form: any) {
		form.reset();
	}
	closeModal(form: any) {
		this.isModalActive = !this.isModalActive;
		this.cleanModal(this.formReembolso);
	}
	viewReembolsoModal(refund: any) {
		this.reembolsoSelecionado = refund;
		if (refund.status === 'Aguardando') {
			this.reembolsoSelecionado = refund;
			const path = '';
			console.log('Upload url:' + this.reembolsoSelecionado.uploadUrl);
			console.log('data' + this.reembolsoSelecionado.data);
			console.log('Reembolso' + this.reembolsoSelecionado);
			this.formReembolso.setValue({
				nome: this.reembolsoSelecionado.nome,
				categoria: this.reembolsoSelecionado.categoria,
				data: this.reembolsoSelecionado.data,
				valorSolicitado: this.reembolsoSelecionado.valorSolicitado,
				uploadUrl: path
			});
			this.toggleModal();

		}
	}
	buscarCategorias() {
		this.reembolsoService.buscarCategorias().subscribe(res => {
			console.log(this.categorias);
			this.categorias = res;
			console.log(this.categorias);
		});
		console.log(this.categorias);
	}
	buscarReembolsoByEmpresa() {
		this.reembolsoService.buscarReembolsoByEmpresa().subscribe(res => {
			this.reembolsos = res;
			console.log(this.reembolsos);
		}, error => {
			console.log(error);
		}
		);
	}

	ngOnInit() {
		this.buscarCategorias();
		this.buscarReembolsoByEmpresa();

		this.formReembolso = new FormGroup({
			'nome': new FormControl('', [Validators.minLength(4), Validators.required]),
			'categoria': new FormControl('', Validators.required),
			'valorSolicitado': new FormControl('', Validators.required),
			'data': new FormControl('', Validators.required),
			'uploadUrl': new FormControl(null, Validators.required)

		});

	}

	onSubmit(reembolso: ReembolsoDTO) {
		this.reembolsoService.addReembolso(reembolso).subscribe((res) => {
			console.log(reembolso);
		}, error => {
			console.log(error);
		});


	}
}


