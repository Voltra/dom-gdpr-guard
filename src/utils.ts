import { GdprManager } from "gdpr-guard";
import { RenderPayload, render } from "./render";
import { Rendered } from "./Renderer";
import { DiffDOM } from "diff-dom";

/**
 * @global diffing
 * Used for DOM diffing operations (to efficiently reduce DOM manipulations)
 */
const diffing = new DiffDOM();

/**
 * Mount the rendered element in the target (using diffs)
 * @param target - The target in which the rendered element will be mounted
 * @param rendered - The rendered element to mount
 */
export const mountOnTarget = (target: Element, rendered: Rendered) => {
	if(target.childElementCount){
		const diffSource = target.children.item(0);
		const diff = diffing.diff(diffSource, rendered);
		diffing.apply(diffSource, diff);
	}else // for very first render (otherwise diff root is !=)
		target.appendChild(rendered);
};

/**
 *
 * @param target - The target in which the rendered element will be mounted
 * @param manager - The manager state to render
 * @param payload - The render configuration
 * @returns The function to call to re-render
 */
export const renderInside = (target: Element, manager: GdprManager, payload: RenderPayload) => {
	const doRender = () => {
		const rendered = render(manager, payload);
		mountOnTarget(target, rendered);
	};

	doRender();

	return doRender;
}