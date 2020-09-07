export interface Page {
	name: string;
	fileName?: string;
	fileType?: string;
	layout?: string;
	includes: Include[];
}

export interface Include {
	name: string;
	data: Data[];
}

export interface Data {
	key: string;
	value: string;
}
