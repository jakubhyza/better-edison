import { createComponent } from '../core/renderer';
import { getResourceUrl } from '../core/resource-manager';
import { RenderableChildren, RenderableComponent } from '../types/renderable';

type SidebarProps = {
	children: RenderableChildren[];
}

export function BeSidebar(props: SidebarProps): RenderableComponent {
	const img = getResourceUrl('img/be-logo.svg');
	return createComponent('div', { class: 'be-sidebar' },
		createComponent('div', { class: 'be-sidebar__logo' },
			createComponent('img', { src: img, alt: 'Better Edison Logo'})
		),
		...props.children
	);
}

