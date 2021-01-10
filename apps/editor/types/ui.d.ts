import { ToolbarButton } from './editor';
import { Emitter } from './event';

export interface Component<T = {}, R = {}> {
  props: T;
  state: R;
  vnode: VNode;
  refs: Record<string, HTMLElement>;
  render(): any;
  addEvent?(): void;
  mounted?(): void;
  updated?(): void;
  beforeDestroy?(): void;
}

export interface VNodeWalker {
  current: VNode | null;

  root: VNode | null;

  entering: boolean;

  walk: () => { vnode: VNode; entering: boolean } | null;
}

export interface VNode {
  type: string | ComponentClass;

  props: Record<string, any>;

  children: VNode[];

  parent: VNode | null;

  old: VNode | null;

  firstChild: VNode | null;

  next: VNode | null;

  ref?: (node: Node) => void;

  node: Node | null;

  effect: 'A' | 'U' | 'D';

  component?: Component;

  skip: boolean;

  walker: () => VNodeWalker;
}

export interface ComponentClass {
  new (props?: Record<string, any>): Component;
}

export interface Pos {
  left: string;
  top: string;
}

export type TooltipStyle = {
  display: 'none' | 'block';
} & Partial<Pos>;

export interface LayerInfo {
  headerText?: string;
  fromEl: HTMLElement;
  pos: Pos;
  className: string;
  render: (props: Record<string, any>) => VNode | VNode[];
}

export interface TabInfo {
  name: string;
  text: string;
}

export type ToolbarItemInfo = {
  name: string;
  className: string;
  tooltip: string;
  command?: string;
  state?: string;
  noIcon?: boolean;
  active?: boolean;
  toggle?: boolean;
};

// @TODO
export type ToolbarItem = (string | ToolbarButton) | (string | ToolbarButton)[];

export type ExecCommand = (command: string, payload?: Record<string, any>) => void;
export type ShowTooltip = (tooltipText: string, tooltipPos: Pos) => void;
export type HideTooltip = () => void;
export type HideLayer = () => void;
export type SetLayerInfo = (info: LayerInfo) => void;
