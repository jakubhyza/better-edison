import { nativeElement } from "./native.element";

type HeaderProps = {

}

function render(props: HeaderProps, children: string = ''): string {
	return nativeElement('div', { class: 'be-header' }, children);
}

export { render as BeHeader }
