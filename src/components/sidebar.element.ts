type SidebarProps = {

}

function render(props: SidebarProps, children: string = ''): string {
	return `
		<div class="be-sidebar">
			${children}
		</div>
	`;
}

export { render as BeSidebar }
