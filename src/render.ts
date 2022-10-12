import { GdprGuard, GdprGuardGroup, GdprManager, GdprManagerFactory, GdprSavior } from "gdpr-guard"
import { GroupRenderFunction, GuardRenderFunction, ManagerRenderFunction, Rendered } from "./Renderer"

/**
 * Configuration for the render function
 */
export interface RenderPayload {
	/**
	 * Manager rendering function
	 */
	renderManager: ManagerRenderFunction;

	/**
	 * Group rendering function
	 */
	renderGroup: GroupRenderFunction;

	/**
	 * Guard rendering function
	 */
	renderGuard: GuardRenderFunction;
}

/**
 * Result of the render function
 */
export interface GdprRenderResult {
	/**
	 * The rendered element
	 */
	rendered: Rendered;

	/**
	 * The manager used to render
	 */
	manager: GdprManager;
}

/**
 * Render the current manager state (you will manually handle re-renders)
 * @param manager - The manager to render
 * @param payload - The render configuration
 */
export const render = async (manager: GdprManager, payload: RenderPayload): Promise<GdprRenderResult> => {
	const {
		renderManager: rm,
		renderGroup: rgr,
		renderGuard: rgu,
	} = payload;


	const renderer = {
		bound(method: keyof typeof renderer) {
			return this[method].bind(this);
		},
		renderGuard(guard: GdprGuard): Promise<Rendered> {
			return rgu(this.bound("renderGroup"), guard);
		},
		renderGroup(group: GdprGuardGroup): Promise<Rendered> {
			return rgr(this.bound("renderGuard"), group);
		},
		renderManager(manager: GdprManager): Promise<Rendered> {
			return rm(this.bound("renderGroup"), manager);
		},
	};


	const rendered = await renderer.renderManager(manager);

	return {
		rendered,
		manager,
	};
};
