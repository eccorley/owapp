const {
  nameFromDisplayName,
  getPlayer,
  getPlayerStats,
  getTeams,
  getRanks
} = require("./apiClient");
const { connectionFromArray, toGlobalId } = require("graphql-relay");
require("es6-promise").polyfill();
require("isomorphic-fetch");

export default {
  Query: {
    async player(_, { name }) {
      const player = await getPlayer(name);

      if (player) {
        return { ...player, name };
      }

      return player;
    },
    async teams(_, args) {
      const teamRes = await getTeams();

      const competitors =
        teamRes && teamRes.competitors ? teamRes.competitors : [];

      return connectionFromArray(competitors, args);
    },
    async ranks() {
      const res = await await getRanks();

      const values = res && res.ranks ? res.ranks : [];

      return values;
    }
  },
  LeagueTeam: {
    id: ({ competitor: { id } }) => toGlobalId("LeagueTeam", id),
    name: ({ competitor: { name } }) => name,
    homeLocation: ({ competitor: { homeLocation } }) => homeLocation,
    primaryColor: ({ competitor: { primaryColor } }) => primaryColor,
    secondaryColor: ({ competitor: { secondaryColor } }) => secondaryColor,
    abbreviatedName: ({ competitor: { abbreviatedName } }) => abbreviatedName,
    logo: ({ competitor: { logo } }) => logo,
    icon: ({ competitor: { icon } }) => icon,
    secondaryPhoto: ({ competitor: { secondaryPhoto } }) => secondaryPhoto,
    players: async ({ competitor }, args) => {
      if (!competitor) {
        return connectionFromArray([], args);
      }

      let playersArr = competitor.players ? competitor.players : [];
      const id = competitor.id;
      if (!playersArr || (playersArr && playersArr.length === 0)) {
        // assume it's part of ranks
        const res = await fetch("https://api.overwatchleague.com/teams").then(
          r => r.json()
        );

        if (!res) {
          return connectionFromArray([], args);
        }

        const targetTeam = res.competitors.find(
          team => team.competitor.id === id
        );
        playersArr =
          targetTeam && targetTeam.competitor && targetTeam.competitor.players
            ? targetTeam.competitor.players
            : [];
      }
      const newArr = [];
      playersArr.forEach(player => {
        newArr.push(player.player);
      });

      return connectionFromArray(newArr, args);
    }
  },
  LeaguePlayer: {
    id: ({ id }) => toGlobalId("LeaguePlayer", id),
    name: ({ name }) => name,
    homeLocation: ({ homeLocation }) => homeLocation,
    heroes: ({ attributes: { heroes } }) => heroes,
    playerNumber: ({ attributes: { player_number } }) => player_number,
    role: ({ attributes: { role } }) => role,
    familyName: ({ familyName }) => familyName,
    givenName: ({ givenName }) => givenName,
    nationality: ({ nationality }) => nationality,
    headshot: ({ headshot }) => headshot,
    accounts: async (obj, args) => {
      const accs = obj && obj.accounts ? obj.accounts : [];
      return connectionFromArray(accs, args);
    }
  },
  LeagueAccount: {
    id: ({ id }) => toGlobalId("LeagueAccount", id),
    value: ({ value }) => value,
    accountType: ({ accountType }) => accountType,
    isPublic: ({ isPublic }) => isPublic,
    playerId: ({ competitorId }) => toGlobalId("LeaguePlayer", competitorId)
  },
  LeagueRank: {
    placement: ({ placement }) => placement,
    advantage: ({ advantage }) => advantage,
    team: obj => obj,
    records: ({ records }) => records
  },
  LeagueRecord: {
    gameLoss: ({ gameLoss }) => gameLoss,
    gamePointsAgainst: ({ gamePointsAgainst }) => gamePointsAgainst,
    gamePointsFor: ({ gamePointsFor }) => gamePointsFor,
    gameTie: ({ gameTie }) => gameTie,
    gameWin: ({ gameWin }) => gameWin,
    matchBye: ({ matchBye }) => matchBye,
    matchDraw: ({ matchDraw }) => matchDraw,
    matchLoss: ({ matchLoss }) => matchLoss,
    matchWin: ({ matchWin }) => matchWin
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
