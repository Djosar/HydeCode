import YAML from 'yaml';
import {Site, SiteConfig} from '../interfaces/site';
import {copy, CopyFilterSync, writeFile, ensureDir, readFile} from 'fs-extra';

const args = process.argv.slice(2);

const templatePath = args[0];

initProject(templatePath);

export function initProject(templatePath: string) {
	if (!templatePath.length) {
		console.error('ERROR: Please enter project title.');
	} else {
		const filter = (src: string, dest: string) => src !== 'boilerplate/.gitignore';

		getYaml(templatePath)
			.then(out => YAML.parse(out) as Site)
			.then(out => copyBoilerplate(out.title, filter))
			.catch(err => console.error('SITE INIT ERROR', err));

		/*const yaml: string = YAML.stringify(siteConfig);
		const filter = (src: string, dest: string) => {
			return src !== 'boilerplate/.gitignore';

		};

		copyBoilerplate(siteConfig.title.toLowerCase(), filter)
			.then(() => createYamlFile(siteConfig.title.toLowerCase(), yaml))
			.catch(err => console.error('INIT SITE ERROR', err));*/

	}
}

function getYaml(path: string): Promise<string> {
	return readFile(path, 'utf-8');
}

function createYamlFile(name: string, content: string) {
	return ensureDir(`./sites/${name}/`)
		.then(() => writeFile(`./sites/${name}/_config.yml`, content))
}

function copyBoilerplate(name: string, copyFilter: CopyFilterSync) {
	return copy('./boilerplate', `./sites/${name}`, {filter: copyFilter});
}
