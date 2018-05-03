const {
  nameFromDisplayName,
  getPlayer,
  getPlayerStats
} = require("./apiClient");

export default {
  Query: {
    async player(_, { name }) {
      const player = await getPlayer(name);
      console.log(player);

      if (player) {
        return { ...player, name };
      }

      return player;
    }
  },

  Player: {
    async account(player, { region, platform }) {
      return (await getPlayer(player.name)).accounts.filter(account => {
        return account.platform === platform;
      })[0];
    }
  },

  PlayerAccount: {
    async stats(account) {
      const stats = (await getPlayerStats(
        nameFromDisplayName(account.displayName),
        account.region,
        account.platform
      )).stats;

      return stats;
    }
  }
};
