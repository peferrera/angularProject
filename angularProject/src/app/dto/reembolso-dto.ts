export class ReembolsoDTO {
	constructor(
		public nome: string,
		public categoria: string,
		public data: string,
		public valorSolicitado: number,
		public valorReembolsado: number,
		public uploadUrl: string,
		public status: string,
		public idUsuario: number,
		public nomeUsuario: string,
		public emailUser: string,
	) { }
}
