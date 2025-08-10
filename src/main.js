import kaplay from 'kaplay';
import { makeBackground } from './utils';
import { SACLE_FACTOR } from './constants';
import { makePlayer } from './player';
import { makeScoreBox } from './makeScoreBox';

const k = kaplay({
  width: 1280,
  height: 720,
  letterbox: true,
  global: false,
  scale: 2,
});

const {
  loadSprite,
  scene,
  add,
  sprite,
  pos,
  go,
  scale,
  z,
} = k;

loadSprite("flares", "./flares.png");

loadSprite("bg", "./bg.png");
loadSprite("khusibird", "./khusibird.png");
loadSprite("med", "./med.png");
loadSprite("virusupgrade", "./virusupgrade.png");

scene("start", async () => {
  makeBackground(k);


  const map = add([
    sprite('flares'),
    pos(0, 0),
    scale(SACLE_FACTOR),
    z(1),

  ]);

  const virusupgrade = map.add([
    sprite('virusupgrade'),
    pos(0, 0),
    {
      speed: 5,
    },
    z(2),
  ]);

  map.onUpdate(() => {
    map.move(map.speed, 0);
    if (map.pos.x > 700) {
      map.pos.x = -500;
    }
  });

  virusupgrade.onUpdate(() => {
    virusupgrade.move(virusupgrade.speed, 0);
    if (virusupgrade.pos.x > 100) {
      virusupgrade.pos.x = -500;
    }
  });

  map.add([sprite('bg'), k.pos(), k.area(), { speed: 100 }, z(4)])

  const player = k.add(makePlayer(k))
  player.pos = k.vec2(k.center().x - 370, k.center().y + 86);

  const playBtn = k.add([
    k.rect(200, 50, { radius: 3 }),
    k.color(k.Color.fromHex('#c65708')),
    k.area(),
    k.z(3),
    k.anchor("center"),
    k.pos(k.center().x + 30, k.center().y + 40),
  ]);

  playBtn.add([
    k.text("Play", { size: 24 }),
    k.color(k.Color.fromHex("#ffffff")),
    k.area(),
    k.anchor("center")
  ])

  const playGame = () => {
    // k.play("confirm");
    k.go("main");
  };

  playBtn.onClick(playGame);
  k.onKeyPress("space", playGame);
  k.onGamepadButtonPress("south", playGame);

  const saved = JSON.parse(localStorage.getItem('maxScore'));

  if(!saved) {
    localStorage.setItem('maxScore', JSON.stringify(0));
  }

  k.scene("main", async () => {
    let score = 0;

    const colliders = await (await fetch("./collidersData.json")).json()
    const collidersData = colliders.data;

    makeBackground(k);

    k.setGravity(2500);

    const map = k.add([k.pos(0, 0), k.scale(SACLE_FACTOR)]);

    map.add([k.sprite("flares"), k.pos()]);

    const virusupgrade = map.add([k.sprite("virusupgrade"), k.pos(), { speed: 5 }]);
    virusupgrade.onUpdate(() => {
      virusupgrade.move(virusupgrade.speed, 0);
      if (virusupgrade.pos.x > 700) {
        virusupgrade.pos.x = -500;
      }
    });

    const platforms = map.add([
      k.sprite("bg"),
      k.pos(),
      k.area(),
      { speed: 100 },
    ]);

    platforms.onUpdate(() => {
      platforms.move(-platforms.speed, 0);
      if (platforms.pos.x < -490) {
        platforms.pos.x = 300;
        platforms.speed += 30;
      }
    });

    k.loop(1, () => {
      score += 1;
    });

    for (const collider of collidersData) {
      platforms.add([
        k.area({
          shape: new k.Rect(k.vec2(0), collider.width, collider.height),
        }),
        k.body({ isStatic: true }),
        k.pos(collider.x, collider.y),
        "bg",
      ]);
    }

    k.add([k.rect(k.width(), 50), k.pos(0, -100), k.area(), "bg"]);

    k.add([k.rect(k.width(), 50), k.pos(0, 1000), k.area(), "bg"]);

    const player = k.add(makePlayer(k));
    player.pos = k.vec2(600, 250);
    player.setControls();
    player.onCollide("bg", async () => {
      if (player.isDead) return;
      // k.play("hurt");
      platforms.speed = 0;
      player.disableControls();
      k.add(makeScoreBox(k, k.center(), score));
      player.isDead = true;
    });

    k.camScale(k.vec2(1.2));
    player.onUpdate(() => {
      k.camPos(player.pos.x, 400);
    });

  })
});

go("start");
