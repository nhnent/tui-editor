import { ResolvedPos } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import {
  CellPos,
  findCell,
  isInCellElement,
  getAllCellPositions,
  getCellPosition
} from '@/wysiwyg/helper/table';
// @TODO move to common file and change path on markdown
import { createTextSelection } from '@/markdown/helper/manipulation';

const SELECTED_CELL_CLASS_NAME = 'te-cell-selected';

interface EventHandlers {
  drag: (ev: Event) => void;
  dragStop: () => void;
}

class TableSelection {
  private view: EditorView;

  private startCellPos: ResolvedPos | null;

  private cellsPos: CellPos[];

  private selectedCellsPos: CellPos[];

  private handlers: EventHandlers;

  constructor(view: EditorView, ev: Event) {
    this.view = view;
    this.startCellPos = null;
    this.cellsPos = [];
    this.selectedCellsPos = [];
    this.handlers = {
      drag: this.drag.bind(this),
      dragStop: this.unbindEvent.bind(this)
    };

    this.init(ev);
  }

  init(ev: Event) {
    const startCellPos = this.getCellPositionByMousePosition(ev as MouseEvent);

    if (startCellPos) {
      this.startCellPos = startCellPos;
      this.cellsPos = getAllCellPositions(startCellPos);
    }

    this.toggleSelectedState(this.cellsPos, false);
    this.bindEvent();
  }

  bindEvent() {
    const { root } = this.view;

    root.addEventListener('mousemove', this.handlers.drag);
    root.addEventListener('mouseup', this.handlers.dragStop);
  }

  unbindEvent() {
    const { root } = this.view;

    root.removeEventListener('mousemove', this.handlers.drag);
    root.removeEventListener('mouseup', this.handlers.dragStop);
  }

  getRange(startCellPos: ResolvedPos, endCellPos: ResolvedPos) {
    const { doc, schema } = this.view.state;

    const [startRowIndex, startColumnIndex] = getCellPosition(startCellPos, doc, schema);
    const [endRowIndex, endColumnIndex] = getCellPosition(endCellPos, doc, schema);
    const columnCount = startCellPos.parent.childCount;

    const [startIndex, endIndex] = [
      startRowIndex * columnCount + startColumnIndex,
      endRowIndex * columnCount + endColumnIndex
    ];

    return [Math.min(startIndex, endIndex), Math.max(startIndex, endIndex)];
  }

  changeCursor(pos: number) {
    const { tr } = this.view.state;
    const selection = createTextSelection(tr, pos);

    this.view.dispatch!(tr.setSelection(selection));
  }

  selectCells(startCellPos: ResolvedPos, endCellPos: ResolvedPos) {
    const [startIndex, endIndex] = this.getRange(startCellPos, endCellPos);
    const positions = this.cellsPos.slice(startIndex, endIndex + 1);

    this.toggleSelectedState(positions, true);

    this.selectedCellsPos = positions;
  }

  getCellPositionByMousePosition({ clientX, clientY }: MouseEvent) {
    const mousePos = this.view.posAtCoords({ left: clientX, top: clientY });

    if (mousePos) {
      const { doc, schema } = this.view.state;
      const currentPos = doc.resolve(mousePos.pos);
      const foundCell = findCell(schema, currentPos);

      if (foundCell) {
        const { depth } = foundCell;
        const cellPos = currentPos.before(depth);

        return currentPos.node(0).resolve(cellPos);
      }
    }

    return null;
  }

  toggleSelectedState(cellsPos: CellPos[], selecting: boolean) {
    const { tr } = this.view.state;
    const className = selecting ? SELECTED_CELL_CLASS_NAME : null;

    cellsPos.forEach(({ nodeStart }: CellPos) => {
      tr.setNodeMarkup(nodeStart, null!, { className });
    });

    this.view.dispatch!(tr);
  }

  drag(ev: Event) {
    const { startCellPos } = this;
    const endCellPos = this.getCellPositionByMousePosition(ev as MouseEvent);

    if (startCellPos && endCellPos) {
      this.toggleSelectedState(this.selectedCellsPos, false);

      if (startCellPos.pos === endCellPos.pos) {
        return;
      }

      ev.preventDefault();

      this.changeCursor(endCellPos.pos);
      this.selectCells(startCellPos, endCellPos);
    }
  }
}

export function tableSelectionPlugin() {
  return new Plugin({
    props: {
      handleDOMEvents: {
        mousedown: (view: EditorView, ev: Event) => {
          const inCell = isInCellElement(ev.target as HTMLElement, view.dom);

          if (inCell) {
            return !!new TableSelection(view, ev);
          }

          return false;
        }
      }
    }
  });
}