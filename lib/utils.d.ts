import { GdprManager } from "gdpr-guard";
import { RenderPayload } from "./render";
import { Rendered } from "./Renderer";
export declare const prepareTarget: (target: Element) => void;
export declare const mountOnTarget: (target: Element, rendered: Rendered) => void;
export declare const renderInside: (target: Element, manager: GdprManager, payload: RenderPayload) => () => void;
