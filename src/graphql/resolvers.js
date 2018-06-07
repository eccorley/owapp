import { getSchedule, getMaps, getNews } from "./apiClient";

const {
  nameFromDisplayName,
  getPlayer,
  getPlayerStats,
  getTeams,
  getTeam,
  getRanks
} = require("./apiClient");
const { connectionFromArray, toGlobalId } = require("graphql-relay");
require("es6-promise").polyfill();
require("isomorphic-fetch");

export default {
  Query: {
    async schedule(_, args) {
      const { data: schedule } = await getSchedule();
      return schedule;
    },
    async news(_, { page = 1 }) {
      const news = await getNews(page);
      return news;
    },
    async maps(_, args) {
      const maps = await getMaps();
      return maps;
    },
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
    async team(_, { id }) {
      const team = await getTeam(id);
      return team;
    },
    async ranks() {
      const res = await await getRanks();

      const values = res && res.ranks ? res.ranks : [];

      return values;
    }
  },
  Schedule: {
    startDate: ({ startDate }) => startDate,
    endDate: ({ endDate }) => endDate,
    stages: ({ stages }) => stages
  },
  News: {
    totalBlogs: ({ totalBlogs }) => totalBlogs,
    pageSize: ({ pageSize }) => pageSize,
    page: ({ page }) => page,
    totalPages: ({ totalPages }) => totalPages,
    blogs: ({ blogs }) => blogs
  },
  NewsBlog: {
    id: ({ blogId }) => blogId,
    created: ({ created }) => created,
    updated: ({ updated }) => updated,
    publish: ({ publish }) => publish,
    title: ({ title }) => title,
    author: ({ author }) => author,
    locale: ({ locale }) => locale,
    keywords: ({ keywords }) => keywords,
    summary: ({ summary }) => summary,
    thumbnail: ({ thumbnail }) => thumbnail,
    header: ({ header }) => header,
    defaultUrl: ({ defaultUrl }) => defaultUrl,
    tags: ({ tags }) => tags
  },
  MediaReference: {
    id: ({ mediaId }) => mediaId,
    url: ({ url }) => url,
    mimeType: ({ mimeType }) => mimeType,
    type: ({ type }) => type,
    size: ({ size }) => size,
    width: ({ width }) => width,
    height: ({ height }) => height,
    originalFilename: ({ originalFilename }) => originalFilename
  },
  Map: {
    id: ({ id }) => toGlobalId("Map", id),
    name: ({ name }) => name,
    background: ({ background }) => background,
    icon: ({ icon }) => icon,
    type: ({ type }) => type,
    description: ({ desc }) => desc,
    thumbnail: ({ thumb }) => thumb
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
  LeagueStage: {
    id: ({ id }) => id,
    name: ({ name }) => name,
    matches: ({ matches }) => matches,
    teams: ({ teams }) => teams
  },
  LeagueMatch: {
    id: ({ id }) => id,
    competitors: match => {
      console.log(match);
      return match.competitors;
    },
    scores: ({ scores }) => scores,
    winner: ({ winner }) => winner,
    games: ({ games }) => games
  },
  LeagueMatchScore: {
    value: ({ value }) => value
  },
  LeagueGame: {
    id: ({ id }) => id,
    number: ({ number }) => number,
    points: ({ points }) => points,
    attributes: ({ attributes }) => attributes
  },
  LeagueGameAttributes: {
    map: ({ map }) => map,
    mapScore: ({ mapScore }) => mapScore
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
