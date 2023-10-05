import { BeHeader } from "../components/header.element";
import { BeMenuItem } from "../components/menu-item.element";
import { BeSidebar } from "../components/sidebar.element";
import { EdisonApiInstance, EdisonMenuItem } from "../types/edison-api-types";
export function initLayout(beInstance: EdisonApiInstance) {
	const headerWrapper = document.querySelector('header');
	const headerAnchor = document.createElement('div');
	headerAnchor.id = 'be-header';
	if (headerWrapper) {
		headerWrapper.appendChild(headerAnchor);
	}
	headerAnchor.innerHTML = BeHeader({}, 'Header');

	const contentWrapper = document.getElementById('overContent');
	contentWrapper?.classList.add('be-content-wrapper');
	const sidebar = document.createElement('div');
	sidebar.id = 'be-sidebar';
	contentWrapper?.insertBefore(sidebar, contentWrapper.firstChild);

	sidebar.innerHTML = BeSidebar({}, beInstance.menu.map(item => BeMenuItem(item)).join(''));
}
