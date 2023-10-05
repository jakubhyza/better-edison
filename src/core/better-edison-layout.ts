import { BeHeader } from "../components/header.element";
import { BeMenuItem } from "../components/menu-item.element";
import { BeSidebar } from "../components/sidebar.element";
import { EdisonApiInstance, EdisonMenuItem } from "../types/edison-api-types";
import { createComponent } from "./renderer";
export function initLayout(beInstance: EdisonApiInstance) {
	const headerWrapper = document.getElementById('overContent');
	const headerAnchor = document.createElement('div');
	headerAnchor.id = 'be-header';
	if (headerWrapper) {
		headerWrapper.insertBefore(headerAnchor, headerWrapper.firstChild);
	}

	const headerComponent = createComponent(BeHeader, { user: beInstance.user }).getHtmlElement();
	headerAnchor.appendChild(headerComponent);

	const contentWrapper = document.getElementById('overContent')?.parentElement;
	contentWrapper?.classList.add('be-content-wrapper');
	const sidebar = document.createElement('div');
	sidebar.id = 'be-sidebar';
	contentWrapper?.insertBefore(sidebar, contentWrapper.firstChild);

	const sidebarItems = beInstance.menu.map(item => createComponent(BeMenuItem, item));
	const sidebarComponent = createComponent(BeSidebar, {},
		...sidebarItems
	).getHtmlElement();
	sidebar.appendChild(sidebarComponent);

	//document.getElementById('be-logout-button')?.addEventListener('click', beInstance.user.logout);
}
