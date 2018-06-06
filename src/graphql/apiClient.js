const owclient = require("../utils/owapi").default;
const lru = require("lru-cache");
const fetch = require("isomorphic-fetch");

const ow = owclient({
  normalizeNamesAs: "camel"
});

const cache = lru({
  max: 300, // All records have a size of 1, so we allow 300 records in cache
  maxAge: 86400000, // 1 day in ms
  length(n, key) {
    return 1;
  }
});

async function getOrSetCache(keyParts, setterFn) {
  const key = keyParts.join(":");

  if (cache.has(key)) {
    return cache.get(key);
  } else {
    const value = await setterFn();
    cache.set(key, value);

    return value;
  }
}

export function nameFromDisplayName(displayName) {
  return displayName.replace("#", "-");
}

export async function getPlayer(name) {
  return getOrSetCache(["p", name], async () => ow.player(name));
}

export async function getPlayerStats(name, region, platform) {
  return getOrSetCache(["s", region, platform, name], async () => {
    return ow.playerStats(name, region, platform);
  });
}

export async function getTeams() {
  return getOrSetCache(["t"], async () =>
    fetch("https://api.overwatchleague.com/teams").then(res => res.json())
  );
}

export async function getRanks() {
  return getOrSetCache(["r"], async () =>
    fetch("https://api.overwatchleague.com/standings").then(r => r.json())
  );
}
