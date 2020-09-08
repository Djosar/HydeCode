import {Include, Page, PageExport} from '../interfaces/page';
import YAML from 'yaml';

export function getPageExport(page: Page) {
	let html: string = `${generateFrontMatter(page)}\n`;
	let yaml: string = '';

	page.includes.map(i => {
		html += generateIncludeHtml(i, page.fileName ?? page.name.toLowerCase().replace(' ', '_')) + '\n'
		yaml += generateIncludeData(i)
	});

	return {
		pageFileName: `${page.fileName ?? page.name.toLowerCase().replace(' ', '_')}.${page.fileType ?? 'html'}`,
		dataFileName: `${page.fileName ?? page.name.toLowerCase().replace(' ', '_')}.yaml`,
		frontMatter: generateFrontMatter(page),
		html,
		yaml
	};
}

function generateFrontMatter(page: Page): string {
	return `---
layout: ${page.layout}
---\n`;
}

function generateIncludeData(include: Include): string {
	const includeDataName = `${include.name}Data`;
	const includeData = {
		[includeDataName]: include.data
	};
	return YAML.stringify(includeData);
}

function generateIncludeHtml(include: Include, pageName: string): string {
	return `{% include ${include.name}.html ${include.name}Data=site.data.${pageName}.${include.name}Data %}`;
}
