import { GdprManager, GdprGuard, GdprGuardGroup, GdprSavior, GdprManagerFactory } from "gdpr-guard"
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

export interface GdprPayload{
	savior: GdprSavior;
	managerFactory: GdprManagerFactory;
}


/**
 * Render the current manager state (you will manually handle re-renders)
 * @param manager - The manager state to use for rendering
 * @param payload - The render configuration
 */
export const render = async (gdpr: GdprPayload, payload: RenderPayload): Promise<Rendered> => {
	const {
		savior,
		managerFactory: factory,
	} = gdpr;

	const manager = await savior.restoreOrCreate(factory);

	const {
		renderManager: rm,
		renderGroup: rgr,
		renderGuard: rgu,
	} = payload;

	const renderer = {
		bound(method: string){
			return this[method].bind(this);
		},
		renderGuard(guard: GdprGuard): Promise<Rendered>{
			return rgu(this.bound("renderGroup"), savior, guard);
		},
		renderGroup(group: GdprGuardGroup): Promise<Rendered>{
			return rgr(this.bound("renderGuard"), savior, group);
		},
		renderManager(manager: GdprManager): Promise<Rendered>{
			return rm(this.bound("renderGroup"), savior, manager);
		},
	};


	return renderer.renderManager(manager);
};
