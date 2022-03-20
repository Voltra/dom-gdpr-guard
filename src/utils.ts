import { GdprManager } from "gdpr-guard";
import { render, RenderPayload } from "./render";
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
	if (target.childElementCount) {
		const diffSource = target.children.item(0);
		const diff = diffing.diff(diffSource, rendered);
		diffing.apply(diffSource, diff);
	} else // for very first render (otherwise diff root is !=)
		target.appendChild(rendered);
};

export type ReRenderFunction = () => Promise<void>;

export interface ReRenderResult {
	render: ReRenderFunction;
	manager: GdprManager;
}

/**
 * Render the GDPR state inside of the given target (provides re-render function)
 * @param target - The target in which the rendered element will be mounted
 * @param manager - The manager to render
 * @param payload - The render configuration
 * @returns The function to call to re-render
 */
export const renderInside = async (target: Element, manager: GdprManager, payload: RenderPayload): Promise<ReRenderResult> => {
	const doRender: ReRenderFunction = async () => {
		const { rendered } = await render(manager, payload);
		mountOnTarget(target, rendered);
	};

	await doRender();

	return {
		render: doRender,
		manager,
	};
}
