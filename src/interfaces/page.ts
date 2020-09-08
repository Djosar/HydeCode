export interface Page {
	name: string;
	fileName?: string;
	fileType?: string;
	layout?: string;
	includes: Include[];
}

export interface Include {
	name: string;
	data: any;
}

export interface PageExport {
	pageFileName: string;
	dataFileName: string;
	frontMatter: string;
	html: string;
	yaml: string;
}

export interface IncludeExport {
	html: string;
	data: string // valid yaml string
}
