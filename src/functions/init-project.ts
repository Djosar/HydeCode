import YAML from 'yaml';
import {Site} from '../interfaces/site';
import {copy, CopyFilterSync, readFile, outputFile} from 'fs-extra';
import {getPageExport} from './page';
import {PageExport} from '../interfaces/page';

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
			.then(out => copyBoilerplate(out, filter))
			.then(out => out?.pages?.forEach(page => createPageFiles(out.title.toLowerCase().replace(' ', '_'), getPageExport(page))))
			.catch(err => console.error('INIT SITE ERROR', err));
	}
}

function getYaml(path: string): Promise<string> {
	return readFile(path, 'utf-8');
}

function createPageFiles(siteName: string, page: PageExport): Promise<void> {

	return outputFile(`./sites/${siteName}/${page.pageFileName}`, page.html)
		.then(() => outputFile(`./sites/${siteName}/_data/${page.dataFileName}`, page.yaml));
}

function copyBoilerplate(site: Site, copyFilter: CopyFilterSync): Promise<Site> {
	return copy('./boilerplate', `./sites/${site.title.toLowerCase().replace(' ', '_')}`, {filter: copyFilter})
		.then(() => site)
}
