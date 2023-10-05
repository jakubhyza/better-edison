import { EdisonUser } from "../types/edison-api-types";
import { nativeElement } from "./native.element";

type HeaderProps = {
	user: EdisonUser;
}

export function BeHeader(props: HeaderProps, children: string = ''): string {
	return `<div class="be-header">
		<div></div>
		<div>
			${props.user.username}
			<button id="be-logout-button">Logout</button>
		</div>
	</div>`;
}
