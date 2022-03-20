import { GdprManager, GdprGuard, GdprGuardGroup, GdprSavior } from "gdpr-guard";
/**
 * The type that renderer functions produce
 */
export declare type Rendered = Element;
/**
 * A type erased group renderer (meant to be used in guard rendering, for multi-level groups)
 */
export declare type SubGroupRenderer = (...args: unknown[]) => Promise<Rendered>;
/**
 * Guard rendering partially applied function
 */
export declare type GuardRenderer = (guard: GdprGuard) => Promise<Rendered>;
/**
 * Group rendering partially applied function
 */
export declare type GroupRenderer = (group: GdprGuardGroup) => Promise<Rendered>;
/**
 * Manager rendering partially applied function
 */
export declare type ManagerRenderer = (manager: GdprManager) => Promise<Rendered>;
/**
 * Userland guard rendering function
 */
export declare type GuardRenderFunction = (renderSubGroup: GroupRenderer | SubGroupRenderer, savior: GdprSavior, guard: GdprGuard) => ReturnType<GuardRenderer>;
/**
 * Userland group rendering function
 */
export declare type GroupRenderFunction = (renderGuard: GuardRenderer, savior: GdprSavior, group: GdprGuardGroup) => ReturnType<GroupRenderer>;
/**
 * Userland manager rendering function
 */
export declare type ManagerRenderFunction = (renderGroup: GroupRenderer, savior: GdprSavior, manager: GdprManager) => ReturnType<ManagerRenderer>;
