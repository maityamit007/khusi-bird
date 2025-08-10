export function makeBackground(k) {
  k.add([k.rect(k.width(), k.height()), k.color(k.Color.fromHex("#FFAF75"))]);
}

export function computeRank(score) {
  if (score > 30) {
    return "S Tier";
  }

  if (score > 20) {
    return "A Tier";
  }

  if (score > 10) {
    return "B Tier";
  }

  if (score > 2) {
    return "C Tier";
  }

  return "Try Again";
}

export function goToGame(k) {
  k.play("confirm");
  k.go("main");
}