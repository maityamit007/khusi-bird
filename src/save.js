// import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs';

export function saveSystem(saveFileName = "save.json") {
    return {
        data: {},
        async save() {
            await writeTextFile(saveFileName, JSON.stringify(this.data), {
                dir: BaseDirectory.AppLocalData,
            })
        },
        async load() {
            try {
                this.data = JSON.parse(
                    await readTextFile(saveFileName, {
                        dir: BaseDirectory.AppLocalData
                    })
                )
            } catch {
                this.data = {};
            }
        }
    }
}