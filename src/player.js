import { SACLE_FACTOR } from "./constants";

export function makePlayer(k) {
  return k.make([
    k.sprite("khusibird"),
    k.area({ shape: new k.Rect(k.vec2(0, 1.5), 8, 5) }),
    k.anchor("center"),
    k.body({ jumpForce: 600 }),
    k.pos(0,0),
    k.z(4),
    k.scale(SACLE_FACTOR),
    {
      isDead: false,
      speed: 600,
      inputControllers: [],
      setControls() {
        const jumpLogic = () => {
          this.jump();
        };

        this.inputControllers.push(k.onKeyPress("space", jumpLogic));
        this.inputControllers.push(k.onClick(jumpLogic));
        this.inputControllers.push(k.onGamepadButtonPress("south", jumpLogic));
      },
      disableControls() {
        this.inputControllers.forEach((inputController) =>
          inputController.cancel()
        );
      },
    },
  ]);
}


// export function makePlayer(k) {
//     return k.make([
//         k.sprite('khusibird'),
//         k.area({ shape: new k.Rect(k.vec2(0, 1.5), 8, 5) }),
//         k.anchor('center'),
//         k.body({ jumpForce: 600 }),
//         k.pos(),
//         k.scale(SACLE_FACTOR),
//         {
//             isDead: false,
//             speed: 600,
//             inputControllers: [],
//             setControls() {
//                 const jumpLogic = () => {
//                     this.jump();
//                 };
//                 this.inputControllers.push(
//                     k.onKeyPress('space', jumpLogic)
//                 );
//                 this.inputControllers.push(
//                     k.onClick(jumpLogic)
//                 );
//                 this.inputControllers.push(
//                     k.onGamepadButtonPress("south", jumpLogic)
//                 );
//             },
//             disableControls() {
//                 this.inputControllers.forEach((keyController) => {
//                     keyController.cancel()
//                 })
//             }
//         }
//     ]);
// }
