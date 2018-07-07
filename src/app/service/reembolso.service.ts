import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EmpresaService } from './empresa.service';
import { ReembolsoDTO } from '../dto/reembolso-dto';
import { FormGroup } from '@angular/forms';
import { tokenName } from '@angular/compiler';
import { EmpresaDTO } from '../dto/empresa-dto';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ReembolsoService extends DataService {
	form: FormGroup;
	reembolsos: ReembolsoDTO[];
	empresaService: EmpresaService;

	constructor(
		http: HttpClient,

	) {
		super(environment.urls.reembolso.url, http);
	}
	addReembolso(reembolso): Observable<any> {
		console.log(reembolso);
		return this.http.post(environment.urls.reembolso.addReembolso, reembolso, this.getHeaders());
	}

	buscarCategorias(): Observable<any> {
		return this.http.get(environment.urls.categoria.buscarCategoria, this.getHeaders());
	}
	buscarReembolsoByUser(): Observable<any> {
		return this.http.get(environment.urls.reembolso.getReembolsoByUser, this.getHeaders());
	}
	buscarReembolsoByEmpresa(): Observable<any> {
		return this.http.get(environment.urls.reembolso.getReembolsoByEmpresa, this.getHeaders());
	}
	aprovarReembolso(reembolsoAprovado): Observable<any> {

		return this.http.post(environment.urls.reembolso.aprovaReembolso, reembolsoAprovado, this.getHeaders());
	}

	reprovarReembolso(reembolsoReprovado): Observable<any> {
		return this.http.post(environment.urls.reembolso.reprovaReembolso, reembolsoReprovado, this.getHeaders());
	}
	excluirReembolso(id: number): Observable<any> {
		return this.http.delete(environment.urls.reembolso.excluiReembolso, this.getHeaders());
	}
	addArquivo(file: File): Observable<any> {
		const urlArquivo = environment.urls.arquivo.addArquivo;
		const formData: FormData = new FormData();
		formData.append('file', file, file.name);
		return this.http.post(urlArquivo, formData, this.getHeaders());
	}
	buscarArquivo(): Observable<any> {
		return this.http.get(environment.urls.arquivo.buscarArquivo, this.getHeaders());
	}

}
