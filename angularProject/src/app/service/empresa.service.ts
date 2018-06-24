import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from './../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { EmpresaDTO } from '../dto/empresa-dto';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class EmpresaService extends DataService {

	constructor(http: HttpClient) {
		super(environment.urls.empresa.url, http);
	}

	public cadastrarUser(user) {
		console.log(user);
		let requestHeaders = new HttpHeaders();
		requestHeaders = requestHeaders.set('Authorization',
			'Bearer ' + localStorage.getItem(environment.tokenName));

		return this.http.post(environment.urls.usuario.cadastrarUser, user, {
			headers: requestHeaders
		});
	}
	public cadastrarAdmin(admin) {
		console.log(admin);
		let requestHeaders = new HttpHeaders();
		requestHeaders = requestHeaders.set('Authorization',
			'Bearer ' + localStorage.getItem(environment.tokenName));

		return this.http.post(environment.urls.usuario.cadastrarAdmin, admin, {
			headers: requestHeaders
		});
	}

}
