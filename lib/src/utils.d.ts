import { GdprManager } from "gdpr-guard";
import { RenderPayload, GdprPayload } from "./render";
import { Rendered } from "./Renderer";
/**
 * Mount the rendered element in the target (using diffs)
 * @param target - The target in which the rendered element will be mounted
 * @param rendered - The rendered element to mount
 */
export declare const mountOnTarget: (target: Element, rendered: Rendered) => void;
export declare type ReRenderFunction = () => Promise<GdprManager>;
export interface ReRenderResult {
    render: ReRenderFunction;
    manager: GdprManager;
}
/**
 * Render the GDPR state inside of the given target (provides re-render function)
 * @param target - The target in which the rendered element will be mounted
 * @param manager - The manager state to render
 * @param payload - The render configuration
 * @returns The function to call to re-render
 */
export declare const renderInside: (target: Element, gdpr: GdprPayload, payload: RenderPayload) => Promise<ReRenderResult>;
