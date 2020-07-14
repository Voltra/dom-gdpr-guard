import { GdprManager, GdprSavior, GdprManagerFactory } from "gdpr-guard";
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
/**
 * The payload required for the Savior API
 */
export interface GdprPayload {
    /**
     * The savior to use
     */
    savior: GdprSavior;
    /**
     * A factory to a {@link GdprManager}
     */
    managerFactory: GdprManagerFactory;
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
 * @param manager - The manager state to use for rendering
 * @param payload - The render configuration
 */
export declare const render: (gdpr: GdprPayload, payload: RenderPayload) => Promise<GdprRenderResult>;
