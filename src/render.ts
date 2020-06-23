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

	const renderGuard: GuardRenderer = function(guard: GdprGuard){
		return rgu(renderGroup, guard);
	};

	const renderGroup: GroupRenderer = function(group: GdprGuardGroup){
		return rgr(renderGuard, group);
	} 

	const renderManager: ManagerRenderer = function(manager: GdprManager){
		return rm(renderGroup, manager);
	} 


	return renderManager(manager);
};
