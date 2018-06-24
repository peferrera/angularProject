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
		return this.http.post(environment.urls.usuario.cadastrarUser, user, this.getHeaders());
	}
	public cadastrarAdmin(admin) {
		console.log(admin);
		return this.http.post(environment.urls.usuario.cadastrarAdmin, admin, this.getHeaders());
	}
	public getRole() {
		return this.http.get(environment.urls.usuario.role, this.getHeaders());
	}




}
