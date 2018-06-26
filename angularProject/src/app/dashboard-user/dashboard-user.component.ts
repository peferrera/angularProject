import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReembolsoService } from '../service/reembolso.service';
import { Router } from '@angular/router';
import { ReembolsoDTO } from '../dto/reembolso-dto';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { EmpresaService } from '../service/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';


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
	public reembolsos: any = [];
	reembolsoSelecionado: any;
	arquivoSelecionado: File = null;
	fileSelected: string;


	constructor(
		private router: Router,
		private reembolsoService: ReembolsoService,
		private empresaService: EmpresaService,
		public toastr: ToastrService,
		private cd: ChangeDetectorRef
	) { }

	toggleModal(formReembolso: any) {
		this.isModalActive = !this.isModalActive;
	}
	cleanModal(form: any) {
		form.reset();
	}
	closeModal(form: any) {
		this.isModalActive = !this.isModalActive;
		this.cleanModal(this.formReembolso);


	}
	addArquivoApi() {
		return this.reembolsoService.addArquivo(this.arquivoSelecionado).subscribe((arquivoUrl: string) => {
			this.fileSelected = arquivoUrl;
		}, error => {
			console.log(error);
		});
	}

	getRole() {
		this.empresaService.getRole();
	}

	buscarReembolsoByUser() {
		this.reembolsoService.buscarReembolsoByUser().subscribe(res => {
			this.reembolsos = res;
			console.log(this.reembolsos);
		}, error => {
			console.log(error);
		}
		);
	}

	buscarCategorias() {
		this.reembolsoService.buscarCategorias().subscribe(res => {
			console.log(this.categorias);
			this.categorias = res;
			console.log(this.categorias);
		});
		console.log(this.categorias);
	}

	addReembolso(reem: ReembolsoDTO) {
		this.reembolsoService.addReembolso(reem).subscribe((res) => {
			console.log(reem);
			this.toastr.success('Reembolso enviado para avaliação', 'Sucesso!');
			this.toggleModal();
		}, error => {
			console.log(error);
		});

	}
	ngOnInit() {


		this.buscarCategorias();
		this.buscarReembolsoByUser();
		this.getRole();

		this.formReembolso = new FormGroup({
			'nome': new FormControl('', [Validators.minLength(4), Validators.required]),
			'categoria': new FormControl('', Validators.required),
			'valorSolicitado': new FormControl('', Validators.required),
			'data': new FormControl('', Validators.required),
			'uploadUrl': new FormControl(null)
		});
	}

	onSubmit(reembolso: ReembolsoDTO) {
		this.addReembolso(reembolso);

	}
	openReembolsoEdit(reembolso: any) {
		if (reembolso.status === 'Aguardando') {
			this.reembolsoSelecionado = reembolso;
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
