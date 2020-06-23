import { GdprManager } from "gdpr-guard";
import { RenderPayload, render } from "./render";
import { Rendered } from "./Renderer";
import { DiffDOM } from "diff-dom";

const diffing = new DiffDOM();

export const mountOnTarget = (target: Element, rendered: Rendered) => {
	if(target.childElementCount){
		const diffSource = target.children.item(0);
		const diff = diffing.diff(diffSource, rendered);
		diffing.apply(diffSource, diff);
	}else // for very first render (otherwise diff root is !=)
		target.appendChild(rendered);
};

export const renderInside = (target: Element, manager: GdprManager, payload: RenderPayload) => {
	const doRender = () => {
		const rendered = render(manager, payload);
		mountOnTarget(target, rendered);
	};

	doRender();

	return doRender;
}