import { saveSystem } from "./save";
import { computeRank } from "./utils";

export function makeScoreBox(k, pos, score) {
    saveSystem().load();
    console.log("Current score:", score);
    if (score > saveSystem().data.maxScore) {
        saveSystem().data.maxScore = score;
        saveSystem().save();
    }

    const container = k.make([
        k.rect(600, 500),
        k.pos(pos),
        k.color(k.Color.fromHex("#eca878")),
        k.area(),
        k.anchor("center"),
        k.outline(4, k.Color.fromHex("#c65708")),
        k.outline(4, k.Color.fromHex("#c65708")),
        k.z(10),
    ]);

    container.add([
        k.text(`Previous Best Score : ${saveSystem().data.maxScore}`, { size: 18 }),
        k.color(k.Color.fromHex("#c65708")),
        k.area(),
        k.pos(-240, -200),
    ]);

    container.add([
        k.text(`Current Score: ${score}`, { size: 18 }),
        k.color(k.Color.fromHex("#c65708")),
        k.area(),
        k.pos(-240, -150),
    ]);

    container.add([
        k.text(`Current Rank : ${computeRank(score)}`, { size: 18 }),
        k.color(k.Color.fromHex("#c65708")),
        k.area(),
        k.pos(-240, 50),
    ]);

    container.add([
        k.text(`Previous Best Rank : ${computeRank(saveSystem().data.maxScore)}`, { size: 18 }),
        k.color(k.Color.fromHex("#c65708")),
        k.area(),
        k.pos(-240, 0),
    ]);

    const restartBtn = container.add([
        k.rect(200, 50, { radius: 3 }),
        k.color(k.Color.fromHex("#c65708")),
        k.area(),
        k.anchor("center"),
        k.pos(0, 200),
    ]);

    restartBtn.add([
        k.text("Play Again", { size: 18 }),
        k.color(k.Color.fromHex("#ffffff")),
        k.area(),
        k.anchor("center"),
    ]);

    function goToGame() {
        k.go("main");
    }

    restartBtn.onClick(goToGame);

    k.onKeyPress("space", goToGame);

    k.onGamepadButtonPress("south", goToGame);

    return container;
}