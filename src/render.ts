import { GdprManager, GdprGuard, GdprGuardGroup } from "gdpr-guard"
import { ManagerRenderer, GroupRenderer, GuardRenderer, Rendered, GroupRenderFunction, ManagerRenderFunction, GuardRenderFunction } from "./Renderer"

export interface RenderPayload{
	renderManager: ManagerRenderFunction;
	renderGroup: GroupRenderFunction;
	renderGuard: GuardRenderFunction;
}

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
