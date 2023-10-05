export function nativeElement(element: string, props: Record<string, string | number>, children: string = ''): string {
	const el = document.createElement(element);
	Object.entries(props).forEach(([key, value]) => {
		el.setAttribute(key, value.toString());
	});
	el.innerHTML = children;
	return el.outerHTML;
}
