import { createComponent } from "../core/renderer";
import { EdisonUser } from "../types/edison-api-types";
import { RenderableComponent } from "../types/renderable";

type HeaderProps =  {
	user: EdisonUser;
	switchLanguage: () => void;
}

export function BeHeader(props: HeaderProps): RenderableComponent {
	return createComponent('div', { class: 'be-header' },
		createComponent('div'),
		createComponent('div', { class: 'be-header__actions' },
			createComponent('div', { class: 'be-header__user-info' },
				createComponent('div', { class: 'username' }, props.user.username),
				createComponent('div', { class: 'login' }, props.user.login),
			),
			createComponent('button', { class: 'be-header__logout', onClick: props.switchLanguage },
				createComponent('i', { class: 'material-symbols-outlined'}, 'translate')
			),
			createComponent('button', { class: 'be-header__logout', onClick: props.user.logout },
				createComponent('i', { class: 'material-symbols-outlined'}, 'logout')
			)
		)
	);
}
