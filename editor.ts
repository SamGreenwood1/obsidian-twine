import { ItemView, WorkspaceLeaf } from "obsidian";

export const TWINE_EDITOR_VIEW = "twine-editor-view";

export class TwineEditorView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return TWINE_EDITOR_VIEW;
    }

    getDisplayText() {
        return "Twine Editor";
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("h4", { text: "Twine Editor View" });
    }

    async onClose() {
        // Nothing to clean up.
    }
}