import { EdisonMenuItem } from "../types/edison-api-types";
import { safe_tags } from "../utils/escape-html";
import { nativeElement } from "./native.element";

export function BeMenuItem(props: EdisonMenuItem, children: string = ''): string {
	return nativeElement('div', { class: `be-menu-item ${props.active ? 'active' : ''}` }, [
			nativeElement('a', { href: props.href, class: `be-menu-item__link ${props.active ? 'active' : ''} ${!props.items || props.items.length == 0 ? 'childless' : 'with-child'}` }, safe_tags(props.text)),
			(!props.items ? '' : props.items.map(subitem => {
				return nativeElement('div', { class: 'be-menu-item__subitem' }, BeMenuItem(subitem));
			}).join('')),
		].join(''),
	);
}
