import YAML from 'yaml';
import {SiteConfig} from '../interfaces/site';
import {copy, CopyFilterSync, writeFile, ensureDir} from 'fs-extra';

const args = process.argv.slice(2);

const siteTitle = args[0];
const siteDescription = args[1];

createSite(siteTitle, siteDescription);

export function createSite(title: string = '', description: string = '') {
	if (!title.length) {
		console.error('ERROR: Please enter project title.');
	} else {
		const siteConfig: SiteConfig = {
			title: title,
			description: description
		};

		const yaml: string = YAML.stringify(siteConfig);
		const filter = (src: string, dest: string) => {
			return src !== 'boilerplate/.gitignore';

		};

		copyBoilerplate(siteConfig.title.toLowerCase(), filter)
			.then(() => createYamlFile(siteConfig.title.toLowerCase(), yaml))
			.catch(err => console.error('INIT SITE ERROR', err));

	}
}

function createYamlFile(name: string, content: string) {
	return ensureDir(`./sites/${name}/`)
		.then(() => writeFile(`./sites/${name}/_config.yml`, content))
}

function copyBoilerplate(name: string, copyFilter: CopyFilterSync) {
	return copy('./boilerplate', `./sites/${name}`, {filter: copyFilter});
}
