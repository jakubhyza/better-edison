import { EdisonMenuItem } from "../types/edison-api-types";
import { safe_tags } from "../utils/escape-html";
import { nativeElement } from "./native.element";

function render(props: EdisonMenuItem, children: string = ''): string {
	return `
		<div class="be-menu-item">
			${nativeElement('a', { href: props.href }, safe_tags(props.text))}
		</div>
	`;
}

export { render as BeMenuItem }
