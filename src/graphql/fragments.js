import gql from "graphql-tag";

export const GeneralStatsFragment = gql`
  fragment GeneralStats on GamemodeStats {
    all {
      combat {
        heroDamageDone
        objectiveKills
        deaths
        finalBlows
        eliminations
        soloKills
        multikills
      }
      assists {
        healingDone
        defensiveAssists
        offensiveAssists
      }
      awards {
        medals
        medalsGold
        medalsSilver
        medalsBronze
      }
      game {
        timePlayed
        gamesPlayed
        gamesWon
        gamesLost
        gamesTied
      }
      best {
        eliminationsMostInGame
        finalBlowsMostInGame
        multikillBest
        killStreakBest
        healingDoneMostInGame
        heroDamageDoneMostInGame
      }
    }
  }
`;
