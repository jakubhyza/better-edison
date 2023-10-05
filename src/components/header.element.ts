type HeaderProps = {

}

function render(props: HeaderProps, children: string = ''): string {
	return `
		<div class="be-header">
			${children}
		</div>
	`;
}

export { render as BeHeader }
