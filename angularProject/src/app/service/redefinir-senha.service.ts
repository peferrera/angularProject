import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RedefinirSenhaService extends DataService {

	constructor(http: HttpClient) {
		super(environment.urls.usuario.recuperarSenha, http);
	}
	recuperarSenha(senha) {
		console.log(senha);

		return this.http.post(environment.urls.usuario.recuperarSenha, senha);
	}
}
