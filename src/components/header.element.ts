import { createComponent } from "../core/renderer";
import { EdisonUser } from "../types/edison-api-types";
import { RenderableComponent } from "../types/renderable";

type HeaderProps =  {
	user: EdisonUser;
}

export function BeHeader(props: HeaderProps): RenderableComponent {
	return createComponent('div', { class: 'be-header' },
		createComponent('div'),
		createComponent('div', {},
			props.user.username,
			createComponent('button', { onClick: () => props.user.logout() }, 'Logout')
		)
	);
}
