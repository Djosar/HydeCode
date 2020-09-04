export interface SiteConfig {
	title: string;
	description?: string;
	baseurl?: string;
	defaults?: SiteDefaults[];
}

export interface SiteDefaults {
	scope?: SiteDefaultScope;
	values?: SiteDefaultValue[];
}

export interface SiteDefaultScope {
	path?: string;
	type?: string;
}

export type SiteDefaultValue = { [key: string]: string };
