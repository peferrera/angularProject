export const environment = {
	production: true,
	backEndUrl: 'http://https://reembolsoazul.herokuapp.com/',
	tokenName: 'access_token',
	urls: {
		auth: {
			url: 'https://reembolsoazul.herokuapp.com/auth',
			login: 'https://reembolsoazul.herokuapp.com/login',
			refresh: 'https://reembolsoazul.herokuapp.com/auth/refresh',
		},
		empresa: {
			url: 'https://reembolsoazul.herokuapp.com/usuario/cadastro/porcodigo'
		},
		usuario: {
			url: 'https://reembolsoazul.herokuapp.com/usuario/',
			recuperarSenha: 'https://reembolsoazul.herokuapp.com/usuario/recuperasenha',
			cadastrarAdmin: 'https://reembolsoazul.herokuapp.com/usuario/cadastro/admineempresa',
			cadastrarUser: 'https://reembolsoazul.herokuapp.com/usuario/cadastro/porcodigo',
			role: 'https://reembolsoazul.herokuapp.com/usuario/role'

		},
		reembolso: {
			url: 'https://reembolsoazul.herokuapp.com/reembolso/',
			addReembolso: 'https://reembolsoazul.herokuapp.com/reembolso/adiciona',
		},
		categoria: {
			url: 'https://reembolsoazul.herokuapp.com/categoria/',
			buscarCategoria: 'https://reembolsoazul.herokuapp.com/categoria/buscatodas',
		},
	}
};
