import YAML from 'yaml';
import {Site} from '../interfaces/site';
import {copy, CopyFilterSync, readFile, outputFile} from 'fs-extra';
import {getPage} from './page/get';
import {Page} from '../interfaces/page';

const args = process.argv.slice(2);

const templatePath = args[0];

console.log(templatePath);

initProject(templatePath);

export function initProject(templatePath: string) {
	if (!templatePath.length) {
		console.error('ERROR: Please enter project title.');
	} else {
		const filter = (src: string, dest: string) => src !== 'boilerplate/.gitignore';

		getYaml(templatePath)
			.then(out => YAML.parse(out) as Site)
			.then(out => copyBoilerplate(out, filter))
			.then(out => out?.pages.forEach(page => createPage(out?.title.toLowerCase().replace(' ', '_'), page)))
			.catch(err => console.error('SITE INIT ERROR', err));
	}
}

function getYaml(path: string): Promise<string> {
	return readFile(path, 'utf-8');
}

function createPage(siteName: string, page: Page) {
	const fileName: string = page.fileName ?? page.name.toLowerCase().replace(' ', '_');
	const fileType: string = page.fileType ?? 'html';

	return outputFile(`./sites/${siteName}/${fileName}.${ fileType }`, getPage(page));
}

function copyBoilerplate(site: Site, copyFilter: CopyFilterSync): Promise<Site> {
	return copy('./boilerplate', `./sites/${site.title.toLowerCase().replace(' ', '_')}`, {filter: copyFilter})
		.then(() => site)
}
