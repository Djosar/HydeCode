import {Page} from './page';

export interface Site {
	title: string;
	pages: Page[];
	config: SiteConfig;
}

export interface SiteConfig {
	defaults: SiteDefaults;
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
