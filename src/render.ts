import { GdprManager, GdprGuard, GdprGuardGroup } from "gdpr-guard"
import { Rendered, GroupRenderFunction, ManagerRenderFunction, GuardRenderFunction } from "./Renderer"

/**
 * Configuration for the render function
 */
export interface RenderPayload{
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
 * Render the current manager state
 * @param manager - The manager state to use for rendering
 * @param payload - The render configuration
 */
export const render = (manager: GdprManager, payload: RenderPayload): Rendered => {
	const {
		renderManager: rm,
		renderGroup: rgr,
		renderGuard: rgu,
	} = payload;

	const renderer = {
		bound(method: string){
			return this[method].bind(this);
		},
		renderGuard(guard: GdprGuard): Rendered{
			return rgu(this.bound("renderGroup"), guard);
		},
		renderGroup(group: GdprGuardGroup): Rendered{
			return rgr(this.bound("renderGuard"), group);
		},
		renderManager(manager: GdprManager): Rendered{
			return rm(this.bound("renderGroup"), manager);
		},
	};


	return renderer.renderManager(manager);
};
