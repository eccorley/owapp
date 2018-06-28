import gql from "graphql-tag";
import { GeneralStatsFragment } from "./fragments";

export const StandingsQuery = gql`
  query StandingsQuery {
    ranks {
      team {
        teamId
        icon
        name
        abbreviatedName
        homeLocation
        primaryColor
        secondaryColor
        players(first: 10) {
          edges {
            node {
              headshot
              name
              homeLocation
              nationality
              role
              heroes
            }
          }
        }
      }
      placement
      records {
        matchWin
        matchLoss
      }
    }
  }
`;

export const TeamQuery = gql`
  query TeamQuery($teamId: String) {
    team(teamId: $teamId) {
      teamId
      icon
      name
      abbreviatedName
      homeLocation
      primaryColor
      secondaryColor
      players(first: 10) {
        edges {
          node {
            headshot
            name
            homeLocation
            nationality
            role
            heroes
          }
        }
      }
    }
  }
`;

export const PlayerQuery = gql`
  query PlayerQuery($name: String!, $platform: String!) {
    player(name: $name) {
      account(platform: $platform, region: "") {
        level
        displayName
        portrait
        stats {
          achievements {
            name
            achieved
          }
          quickplay {
            ...GeneralStats
          }
          competitive {
            ...GeneralStats
          }
          competitiveRank
        }
      }
    }
  }
  ${GeneralStatsFragment}
`;

export const NewsQuery = gql`
  {
    news {
      blogs {
        title
        author
        summary
        defaultUrl
        tags
        keywords
        publish
        thumbnail {
          url
        }
      }
    }
  }
`;
