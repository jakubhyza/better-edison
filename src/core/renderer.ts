import { RenderableChildren, RenderableComponent } from "../types/renderable";

export function createComponent(component: any, props: Record<string, any> = {}, ...children: RenderableChildren[]): RenderableComponent {

	const normalizeChild = (child: RenderableChildren): HTMLElement => {
		if (typeof child === 'string') {
			const childElement = document.createElement('span');
			childElement.innerText = child;
			return childElement;
		}
		else if ((child as RenderableComponent).getHtmlElement !== undefined) {
			return (child as RenderableComponent).getHtmlElement();
		}
		else return child as HTMLElement;
	}
	const normalizedChildren = children.map(normalizeChild);

	let el: HTMLElement;
	switch (typeof component) {
		case 'string':
			el = document.createElement(component);
			Object.entries(props).forEach(([key, value]) => {
				if (key.length > 2 && key.substring(0, 2) === 'on' && key[2] >= 'A' && key[2] <= 'Z') {
					const eventName = key.substring(2).toLowerCase();
					el.addEventListener(eventName, value);
					return;
				}

				el.setAttribute(key, (value as any).toString());
			});
			normalizedChildren.forEach(child => {
				el.appendChild(child);
			});
		break;
		case 'function':
			props.children = normalizedChildren;
			el = component(props).getHtmlElement();
		break;
		default:
			throw new Error('Invalid component type');
	}

	return {
		getHtmlElement: () => {
			return el;
		}
	};
}
