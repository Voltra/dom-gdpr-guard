import { GdprGuard, GdprGuardGroup, GdprManager } from "gdpr-guard"

/**
 * The type that renderer functions produce
 */
export type Rendered = Element;

/**
 * A type erased group renderer (meant to be used in guard rendering, for multi-level groups)
 */
export type SubGroupRenderer = (...args: unknown[]) => Promise<Rendered>;

/**
 * Guard rendering partially applied function
 */
export type GuardRenderer = (guard: GdprGuard) => Promise<Rendered>;

/**
 * Group rendering partially applied function
 */
export type GroupRenderer = (group: GdprGuardGroup) => Promise<Rendered>;

/**
 * Manager rendering partially applied function
 */
export type ManagerRenderer = (manager: GdprManager) => Promise<Rendered>;

/**
 * User-land guard rendering function
 */
export type GuardRenderFunction = (renderSubGroup: GroupRenderer | SubGroupRenderer, guard: GdprGuard) => ReturnType<GuardRenderer>;

/**
 * User-land group rendering function
 */
export type GroupRenderFunction = (renderGuard: GuardRenderer, group: GdprGuardGroup) => ReturnType<GroupRenderer>;

/**
 * User-land manager rendering function
 */
export type ManagerRenderFunction = (renderGroup: GroupRenderer, manager: GdprManager) => ReturnType<ManagerRenderer>;
