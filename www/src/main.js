import {HttpClient} from 'aurelia-fetch-client';
import {Session} from './session';

export function configure(aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.plugin('aurelia-validation');

	console.log('ran config');

	let http = new HttpClient()
	http.configure(config => {
	  config
	    .withBaseUrl('https://api.github.com/');
	});

	let session = new Session()

	//injeta site 1 na session para testes
	session.site = { id:1, title:"Teste de site 1" }
	session.user = { id:1, nome:"Usuário de teste" }

	aurelia.container.registerInstance(HttpClient, http);
	aurelia.container.registerInstance(Session, session);

	aurelia.start().then(() => aurelia.setRoot());
}
