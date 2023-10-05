import { getResourceUrl } from '../core/resource-manager';
import { nativeElement } from './native.element';

type SidebarProps = {

}

function render(props: SidebarProps, children: string = ''): string {
	const img = getResourceUrl('img/be-logo.svg');
	return `
		<div class="be-sidebar">
			<div class="be-sidebar__logo">
				${nativeElement('img', { src: img, alt: 'Better Edison Logo'})}
			</div>
			${children}
		</div>
	`;
}

export { render as BeSidebar }
