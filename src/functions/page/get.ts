import {Data, Page} from '../../interfaces/page';

export function getPage(page: Page) {
	return page.includes.map(include => {
		const newData = getData(include.data);
		return `---\n---
		<div>{% include ${include.name}.html ${newData} %}</div>\n`;
	}).join('\n');
}

function getData(data: Data[]): string {
	return data.map(d => `${d.key}="${d.value}"`).join(' ');
}