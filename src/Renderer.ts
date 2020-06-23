import { GdprManager, GdprGuard, GdprGuardGroup } from "gdpr-guard"

//TODO: Allow to have a reference to the parent in renderers
//TODO: Make use of the Savior API

/**
 * The type that renderer functions producce
 */
export type Rendered = Element;

/**
 * A type erased group renderer (meant to be used in guard rendering, for multi-level groups)
 */
export type SubGroupRenderer = (...args: any[]) => Rendered;

/**
 * Guard rendering partially applied function
 */
export type GuardRenderer = (guard: GdprGuard) => Rendered;

/**
 * Group rendering partially applied function
 */
export type GroupRenderer = (group: GdprGuardGroup) => Rendered;

/**
 * Manager rendering partially applied function
 */
export type ManagerRenderer = (manager: GdprManager) => Rendered;

/**
 * Userland guard rendering function
 */
export type GuardRenderFunction = (renderSubGroup: GroupRenderer|SubGroupRenderer, guard: GdprGuard) => ReturnType<GuardRenderer>;

/**
 * Userland group rendering function
 */
export type GroupRenderFunction = (renderGuard: GuardRenderer, group: GdprGuardGroup) => ReturnType<GroupRenderer>;

/**
 * Userland manager rendering function
 */
export type ManagerRenderFunction = (renderGroup: GroupRenderer, manager: GdprManager) => ReturnType<ManagerRenderer>;
