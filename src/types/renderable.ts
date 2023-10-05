export type RenderableFunction = (props: any) => HTMLElement;
export type RenderableChildren = string  | HTMLElement | RenderableComponent;
export type Renderable = string | RenderableFunction;
export interface RenderableComponent {
	getHtmlElement(): HTMLElement;
}
