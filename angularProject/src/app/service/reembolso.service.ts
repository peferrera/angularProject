import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EmpresaService } from './empresa.service';
import { ReembolsoDTO } from '../dto/reembolso-dto';
import { FormGroup } from '@angular/forms';
import { tokenName } from '@angular/compiler';

@Injectable({
	providedIn: 'root'
})
export class ReembolsoService extends DataService {
	form: FormGroup;

	constructor(
		http: HttpClient,
	) {
		super(environment.urls.reembolso.url, http);
	}
	addReembolso(reembolso) {
		console.log(reembolso);
		console.log(environment.tokenName.toString);
		return this.http.post(environment.urls.reembolso.addReembolso, reembolso, this.getHeaders());
	}

	buscarCategorias() {
		return this.http.get(environment.urls.categoria.buscarCategoria, this.getHeaders());
	}
}
