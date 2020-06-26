import { GdprManager, GdprGuard, GdprGuardGroup } from "gdpr-guard";
export declare type Rendered = Element;
export declare type SubGroupRenderer = (...args: any[]) => Rendered;
export declare type GuardRenderer = (guard: GdprGuard) => Rendered;
export declare type GroupRenderer = (group: GdprGuardGroup) => Rendered;
export declare type ManagerRenderer = (manager: GdprManager) => Rendered;
export declare type GuardRenderFunction = (renderSubGroup: GroupRenderer | SubGroupRenderer, guard: GdprGuard) => ReturnType<GuardRenderer>;
export declare type GroupRenderFunction = (renderGuard: GuardRenderer, group: GdprGuardGroup) => ReturnType<GroupRenderer>;
export declare type ManagerRenderFunction = (renderGroup: GroupRenderer, manager: GdprManager) => ReturnType<ManagerRenderer>;
