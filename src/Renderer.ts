import { GdprManager, GdprGuard, GdprGuardGroup } from "gdpr-guard"

export type Rendered = Element;

export type SubGroupRenderer = (...args: any[]) => Rendered;

export type GuardRenderer = (guard: GdprGuard) => Rendered;
export type GroupRenderer = (group: GdprGuardGroup) => Rendered;
export type ManagerRenderer = (manager: GdprManager) => Rendered;

export type GuardRenderFunction = (renderSubGroup: GroupRenderer|SubGroupRenderer, guard: GdprGuard) => ReturnType<GuardRenderer>;
export type GroupRenderFunction = (renderGuard: GuardRenderer, group: GdprGuardGroup) => ReturnType<GroupRenderer>;
export type ManagerRenderFunction = (renderGroup: GroupRenderer, manager: GdprManager) => ReturnType<ManagerRenderer>;
