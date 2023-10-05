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

	const sidebarItems = beInstance.menu.map(item => createComponent(BeMenuItem, { ... item, items: [] }));
	const sidebarComponent = createComponent(BeSidebar, {},
		...sidebarItems
	).getHtmlElement();
	sidebar.appendChild(sidebarComponent);

	const activeItemIndex = beInstance.menu.findIndex(item => item.active);
	const activeItem = beInstance.menu[activeItemIndex];
	if (activeItem && activeItem.items && activeItem.items.length > 0) {
		sidebar.appendChild(createComponent(BeSidebar, {}, ...activeItem.items.map(item => createComponent(BeMenuItem, item))).getHtmlElement());

		const getActiveIndex = (item: EdisonMenuItem[], index: number = 0): number => {
			for (let i = 0 ; i < item.length ; i++) {
				if (item[i].active) {
					return index;
				}
				index++;
				if (item[i].items) {
					const subIndex = getActiveIndex(item[i].items ?? [], index);
					if (subIndex !== -1) {
						return subIndex;
					}
					index += item[i]?.items?.length ?? 0;
				}
			}
			return -1;
		}

		const activeSubItemIndex = getActiveIndex(activeItem.items);
		console.log(activeItemIndex, activeSubItemIndex);
		if (activeItemIndex === activeSubItemIndex) {
			sidebarComponent.classList.add('be-sidebar--darken-arrow');
		}
	}



	//document.getElementById('be-logout-button')?.addEventListener('click', beInstance.user.logout);
}
