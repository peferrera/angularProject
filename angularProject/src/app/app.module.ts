import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmpresaViewComponent } from './empresa-view/empresa-view.component';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaAddComponent } from './empresa-add/empresa-add.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LoginGuard } from './service/login-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmpresaService } from './service/empresa.service';
import { AuthService } from './service/auth.service';
import { AppErrorHandler } from './commons/app-error-handler';
import { AuthGuard } from './service/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';
import { RedefinirSenhaService } from './service/redefinir-senha.service';
import { EmailEnviadoComponent } from './email-enviado/email-enviado.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';



export function tokenGetter() {
	const token = localStorage.getItem(environment.tokenName);
	return token;
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		EmpresaViewComponent,
		EmpresaAddComponent,
		NavbarComponent,
		NotFoundComponent,
		RedefinirSenhaComponent,
		EmailEnviadoComponent,
		DashboardAdminComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true,
		}),
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: [
					environment.backEndUrl
				],
				blacklistedRoutes: [
					environment.urls.auth.url
				]
			}
		}),
		RouterModule.forRoot([
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
			{ path: 'empresaAdd', component: EmpresaAddComponent },
			{ path: 'redefinirSenha', component: RedefinirSenhaComponent },
			{ path: 'emailEnviado', component: EmailEnviadoComponent },
			{ path: 'dashboardAdmin', component: DashboardAdminComponent },
			{ path: 'not-found', component: NotFoundComponent },
			{ path: '**', component: NotFoundComponent },
		]),
	],
	providers: [
		EmpresaService,
		AuthService,
		AppErrorHandler,
		AuthGuard,
		{ provide: ErrorHandler, useClass: AppErrorHandler },
		RedefinirSenhaService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
