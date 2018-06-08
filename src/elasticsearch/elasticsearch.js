import Appbase from 'appbase-js';

//TODO : COLOCAR INFORMACOES NOS .ENVS
const appbaseRef = new Appbase({
	url: "https://scalr.api.appbase.io",
	app: "evolumebr",
	credentials: "ehOVesXRe:1768a981-95c0-4ef0-b24f-af67f3ae744b"
});

export {appbaseRef as default};