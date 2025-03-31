// settings.ts
import TwinePlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class TwineSettingTab extends PluginSettingTab {
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
                    .onChange(async (value) => {
                        this.plugin.settings.twineExecutablePath = value;
                        await this.plugin.saveSettings();
                    })
            );
    }
}
