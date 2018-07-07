import { Validators, FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { OnInit, Component } from '@angular/core';
import { LoginDTO } from '../dto/login-dto';
import { TokenDTO } from '../dto/token-dto';
import { BadCredentialsError } from '../commons/bad-credentials';
import { UsuarioValidator } from './user-validator';
import { ToastrService } from 'ngx-toastr';
import { faCoffee, faHome } from '@fortawesome/free-solid-svg-icons';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	faHome = faHome;
	userRole: string;

	constructor(
		private router: Router,
		private authService: AuthService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.form = new FormGroup({
			'email': new FormControl(
				'',
				[
					Validators.minLength(4), Validators.required,
					UsuarioValidator.hasWhiteSpace
				]
			),
			'senha': new FormControl('', Validators.required)
		});
	}
	isAdmin() {
		if (this.userRole === 'ROLE_USER') {
			this.router.navigate(['/dashboardUser']);
		}
		if (this.userRole === 'ROLE_ADMIN') {
			this.router.navigate(['/dashboardAdmin']);
		} else {
			this.router.navigate(['/dashboardUser']);
		}
	}

	onSubmit(user: LoginDTO) {
		this.authService.login(user).subscribe((token: TokenDTO) => {
			localStorage.setItem(environment.tokenName, token.access_token);
			const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
			// this.isAdmin();
		},
			(e) => {
				if (e instanceof BadCredentialsError) {
					this.senha.setErrors(e['form']);
				} else {
					throw e;
				}
			});
	}

	get email() {
		return this.form.get('email');
	}


	get senha() {
		return this.form.get('senha');
	}

}
