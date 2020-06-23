import { GdprManager } from "gdpr-guard";
import { Rendered, GroupRenderFunction, ManagerRenderFunction, GuardRenderFunction } from "./Renderer";
export interface RenderPayload {
    renderManager: ManagerRenderFunction;
    renderGroup: GroupRenderFunction;
    renderGuard: GuardRenderFunction;
}
export declare const render: (manager: GdprManager, payload: RenderPayload) => Rendered;
