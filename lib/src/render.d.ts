import { GdprSavior, GdprManagerFactory } from "gdpr-guard";
import { Rendered, GroupRenderFunction, ManagerRenderFunction, GuardRenderFunction } from "./Renderer";
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
export interface GdprPayload {
    savior: GdprSavior;
    managerFactory: GdprManagerFactory;
}
/**
 * Render the current manager state (you will manually handle re-renders)
 * @param manager - The manager state to use for rendering
 * @param payload - The render configuration
 */
export declare const render: (gdpr: GdprPayload, payload: RenderPayload) => Promise<Rendered>;
