import { EdisonMenuItem, EdisonPageInfo, EdisonUser } from "../types/edison-api-types";

export function scrapUser(): EdisonUser {
    const usernameElement = document.querySelector('.unisUserName') as HTMLSpanElement;
    const [userLogin, userName] = usernameElement.innerText.split(", ");

    const logoutLinkElement = document.getElementById('logoutlinkSso') as HTMLLinkElement;
    const logoutLink = logoutLinkElement.href ?? '#';

    return {
        username: userName,
        login: userLogin,
        logout: () => {
            window.location.href = logoutLink;
        }
    }
}

export function scrapPageInfo(): EdisonPageInfo | undefined {
    const infoContainer = document.getElementById("asa.page");
    if (!infoContainer) {
        return undefined;
    }

    const valueMap: Record<string, string> = {
        'asa.page.id': 'id',
        'asa.visitor': 'visitor',
        'asa.url': 'url',
        'asa.page.title': 'title',
        'asa.page.locale': 'locale',
        'asa.page.direction': 'direction',
        'asa.page.breadcrumb': 'breadcrumb',
        'asa.page.cit.serverNode': 'serverNode',

    };
    const info = {
        id:   '',
        visitor: '',
        url: '',
        title: '',
        locale: '',
        direction: '',
        breadcrumb: '',
        serverNode: '',
    };

    Array.from(infoContainer.children).forEach((node) => {
        const key = (node as HTMLSpanElement).getAttribute('class');
        const value = (node as HTMLSpanElement).innerHTML;
        if (key && value) {
            const mappedKey = valueMap[key];
            if (mappedKey) {
                info[mappedKey as keyof typeof info] = value;
            }
        }
    });
    return info;
}

export function scrapAllMenuItems(): EdisonMenuItem[] {
    const primaryMenu = scrapPrimaryMenuItems();
    const secondaryMenu = scrapSecondaryMenuItems();

    return primaryMenu.map((primaryMenuItem) => {
        if (primaryMenuItem.active) {
            primaryMenuItem.items = secondaryMenu;
        }
        return primaryMenuItem;
    });
}

export function scrapPrimaryMenuItems(): EdisonMenuItem[] {
    const menuItemElements = document.querySelectorAll(".wpthemePrimaryNav .wpthemeNavListItem");
    if (!menuItemElements) return [];

    const menuItems: EdisonMenuItem[] = [];
    menuItemElements.forEach((itemElement) => {
        const linkElement = itemElement.querySelector('a') as HTMLLinkElement | null;
        if (!linkElement) return;
        const href = linkElement.href;
        const text = linkElement.innerText;
        const active = itemElement.classList.contains("wpthemeSelected");

        menuItems.push({
            text,
            href,
            active,
        });
    });
    return menuItems;
}

export function scrapSecondaryMenuItems(): EdisonMenuItem[] {
    const menuItemElements = document.querySelectorAll("#sideNav a");
    if (!menuItemElements) return [];

    const menuItems: EdisonMenuItem[] = [];
    menuItemElements.forEach((itemElement) => {
        const linkElement = itemElement as HTMLLinkElement;
        const href = linkElement.href;
        const text = linkElement.innerText;
        const active = linkElement.classList.contains("wpthemeSelected");

        menuItems.push({
            text,
            href,
            active,
        });
    });
    return menuItems;
}

export function layoutVisibility(visible: boolean): void {
    const blockState = visible ? "block" : "none";
    document.querySelectorAll(".wpthemeBanner").forEach((headerElement ) => {
        (headerElement as HTMLDivElement).style.display = blockState;
    })

    const slideMenuButton = document.getElementById('slideMenuButton');
    if (slideMenuButton) slideMenuButton.style.display = blockState;

    const sideNav = document.getElementById('sideNav');
    if (sideNav) sideNav.style.display = blockState;

    const overContent = document.getElementById('overContent');
    if (overContent) overContent.style.padding = visible ? '' : '0';

    const footer = document.querySelector('.wpthemeFooter') as HTMLDivElement;
    if (footer) footer.style.display = blockState;
}
