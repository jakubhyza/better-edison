export function getResourceUrl(path: string): string {

	// @ts-ignore
	const runtime = chrome ?? browser;
	return runtime.runtime.getURL(path);
}
