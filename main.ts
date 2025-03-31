import {
    App,
    Editor,
    MarkdownView,
    Modal,
    Notice,
    Plugin,
    PluginSettingTab,
    Setting,
    WorkspaceLeaf,
    PluginManifest,
} from "obsidian";
import { TwineEditorView, TWINE_EDITOR_VIEW } from "./editor";

interface TwinePluginSettings {
    twineExecutablePath: string;
}

const DEFAULT_SETTINGS: TwinePluginSettings = {
    twineExecutablePath: "",
};

export default class TwinePlugin extends Plugin {
    settings: TwinePluginSettings;

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
        this.settings = Object.assign({}, DEFAULT_SETTINGS, {});
    }

    async onload() {
        await this.loadSettings();

        this.addSettingTab(new TwineSettingTab(this.app, this));

        this.registerView(
            TWINE_EDITOR_VIEW,
            (leaf: WorkspaceLeaf) => new TwineEditorView(leaf)
        );

        this.registerExtensions(["twee", "tw2"], TWINE_EDITOR_VIEW);

        this.addCommand({
            id: "open-twine-editor",
            name: "Open Twine Editor",
            callback: async () => {
                const leaf = this.app.workspace.getLeaf(true);
                leaf.view = new TwineEditorView(leaf);
            },
        });

        this.registerDomEvent(document, "click", (evt: MouseEvent) => {
            //console.log('click', evt);
        });

        this.registerInterval(
            window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
        );
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(TWINE_EDITOR_VIEW);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class TwineSettingTab extends PluginSettingTab {
    plugin: TwinePlugin;

    constructor(app: App, plugin: TwinePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName("Twine Executable Path")
            .setDesc("Path to the Twine executable")
            .addText((text) =>
                text
                    .setPlaceholder("Enter path")
                    .setValue(this.plugin.settings.twineExecutablePath)
                    .onChange(async (value: string) => {
                        this.plugin.settings.twineExecutablePath = value;
                        await this.plugin.saveSettings();
                    })
            );
    }
}
