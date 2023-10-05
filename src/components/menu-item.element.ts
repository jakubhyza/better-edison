import { createComponent } from "../core/renderer";
import { EdisonMenuItem } from "../types/edison-api-types";
import { RenderableComponent } from "../types/renderable";
import { safe_tags } from "../utils/escape-html";

export function BeMenuItem(props: EdisonMenuItem, children: string = ''): RenderableComponent {
	return createComponent('div', { class: `be-menu-item ${props.active ? 'active' : ''}` },
		createComponent('a', { href: props.href, class: `be-menu-item__link ${props.active ? 'active' : ''} ${!props.items || props.items.length == 0 ? 'childless' : 'with-child'}`}, props.text),
		...(!props.items ? []: props.items.map(subitem => {
			return createComponent('div', { class: 'be-menu-item__subitem' },
				createComponent(BeMenuItem, subitem)
			);
		}))
	);
}
