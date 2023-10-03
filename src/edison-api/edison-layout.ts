import { EdisonUser } from "../types/edison-api-types";

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

export function scrapPrimaryMenuItems() {
    const menuItemElements = document.querySelectorAll(".wpthemePrimaryNav .wpthemeNavListItem");
    if (!menuItemElements) return [];

    const menuItems = [];
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

export function headerVisibility(visible: boolean): void {
    const headerElement = document.querySelector(".wpthemeBanner") as HTMLDivElement;
    if (headerElement) {
        headerElement.style.display = visible ? "block" : "none";
    }
}