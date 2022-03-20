import { GdprManager } from "gdpr-guard";
import { GroupRenderFunction, GuardRenderFunction, ManagerRenderFunction, Rendered } from "./Renderer";
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
export declare const render: (manager: GdprManager, payload: RenderPayload) => Promise<GdprRenderResult>;
