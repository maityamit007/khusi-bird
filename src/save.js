export function saveSystem(saveFileName = "save.json") {
    return {
        data: {},
        save() {
            localStorage.setItem(saveFileName, JSON.stringify(this.data));
        },
        load() {
            try {
                const saved = localStorage.getItem(saveFileName);
                this.data = saved ? JSON.parse(saved) : {};
            } catch {
                this.data = {};
            }
        }
    }
}