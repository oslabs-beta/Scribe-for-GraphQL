
declare var require: NodeRequire;
declare var module: NodeModule;
const graphql = require('graphql')
const { gql } = require("apollo-server");
const { makeExecutableSchema } = require('graphql-tools')
// const fetch = require('node-fetch')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLSchema,
    GraphQLBoolean,
} = graphql;

function fetchSluggingLeaderboardByYear(year) {
    return fetch(`https://statsapi.mlb.com/api/v1/stats?stats=Season&group=hitting&season=${year}&limit=100&sortStat=slg&hydrate&metrics&fields`).then(res=> res.json())
}
function fetchLeaderCategoriesCareerBatting(stat) {
    return fetch(`https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=slg&statType=career&limit=100&statGroup=hitting`).then(res=> res.json())
}

function fetchPlayerLink(endpoint) {
    return fetch(`https://statsapi.mlb.com/${endpoint}`).then(res=> res.json())
}

const typeDefs = gql `
type Query {
    SluggingLeadersByYear(year: Int!): SluggingLeadersByYearType
    LeaderCategoriesCareer(stat: String!): LeaderCategoriesCareerType
  }

type SluggingLeadersByYearType {
    copyright: String
    stats: [StatsType]
    playPool: String
}

type StatsType {
    type: String
    group: String
    totalSplits: Int
    exemptions: [String]
    splits: SplitsType
}

type SplitsType {
    season: String
    stat: StatType
    team: TeamType
    player: PlayerType
    league: LeagueType
    sports: SportType
    numTeams: Int
    rank: Int
    position: PositionType
}

type StatType {
    gamesPlayed: Int
    groundOuts: Int
    airOuts: Int
    runs: Int
    doubles: Int
    triples: Int
    homeRuns: Int
    strikeOuts: Int
    baseOnBalls: Int
    intentionalWalks: Int
    hits: Int
    hitByPitch: Int
    avg: Float
    atBats: Int
    obp: Float
    slg: Float
    ops: Float
    caughtStealing: Int
    stolenBases: Int
    stolenBasePercentage: Float
    groundIntoDoublePlay: Int
    numberOfPitches: Int
    plateAppearances: Int
    totalBases: Int
    rbi: Int
    leftOnBase: Int
    sacBunts: Int
    sacFlies: Int
    babip: Float
    groundOutsToAirOuts: Float
    catchersInterference: Int
    atBatsPerHomeRun: Float
}

type TeamType {
    id: Int
    name: String
    link: String
    string: [String]
    type: PlayerType
}

type PlayerType {
    id: Int
    fullName: String
    link: String
    info: String
    firstName: String
    lastName: String
}

type LeagueType {
    id: Int
    name: String
    link: String
}

type SportType {
    id: Int
    link: String
    abbreviation: String
}

type PositionType {
    code: String
    name: String
    type: String
    abbreviation: String
}

type LeaderCategoriesCareerType {
    copyright: String
    leagueLeaders: [LeagueLeadersType]
}

type LeagueLeadersType {
    leaderCategory: String
    gameType: GameTypeType
    leaders: [LeadersType]
    statGroup: String
    totalSplits: String
}
type GameTypeType {
    id: String
    description: String
}

type LeadersType {
    rank: Int
    value: String
    team: TeamType
    league: LeagueType
    person: PlayerType
    sport: SportType
    numTeams: Int
}

type PlayerLinkType {
    copyright: String
    people: [PeopleLinkType]
}

type PeopleLinkType {
    id: String
    fullName: String
    link: String
    firstName: String
    lastName: String
    primaryNumber: String
    birthDate: String
    currentAge: Int
    birthCity: String
    birthStateProvince: String
    birthCOuntry: String
    height: String
    weight: Int
    active: Boolean
    primaryPosition: [PrimaryPositionType]
    useName: String
    useLastName: String
    middleName: String
    boxScoreName: String
    nickName: String
    gender: String
    isPlyaer: Boolean
    isVerified: Boolean
    deathDate: String
    deathCity: String
    deathStateProvince: String
    deathCountry: String
    lastPlayedDates: String
    mlbDebutDate: String
    batSide: [BatSideType]
    pitchHand: [PitchHandType]
    nameFirstLast: String
    nameSlug: String
    firstLastName: String
    lastFirstName: String
    lastInitName: String
    initLastName: String
    fullFMLName: String
    fullLFMName: String
    strikeZoneTop: Float
    strikeZoneBottom: Float
}
type PrimaryPositionType {
    code: String
    name: String
    type: String
    abbreviation: String
}
type BatSideType {
    code: String
    description: String
}
type PitchHandType {
    code: String
    description: String
}
`

const resolvers = {
    Query: {
        SluggingLeadersByYear: (root, args) => {
          return fetchSluggingLeaderboardByYear(args.year);
        },
        LeaderCategoriesCareer: (root, args) => {
          return fetchLeaderCategoriesCareerBatting(args.stat);
        },
      },
  };
/* LEADER BY YEAR */

// const PlayerType = new GraphQLObjectType({
//     name: 'PlayerType',
//     fields: () => ({
//         id: {type: GraphQLInt},
//         fullName: {type: GraphQLString},
//         link: {type: GraphQLString},
//         info: {type: new GraphQLObjectType({
//             name: 'PlayerInfo',
//             fields: () => ({
//             copyright: {type: GraphQLString},
//             people: {type: new GraphQLList(PeopleLinkType)}
//             })
//         }),
//         resolve: (parent, args) => {
//             const link = parent.link;
//             return fetchPlayerLink(link)
//             }
//         },
//         firstName: {type: GraphQLString},
//         lastName: {type: GraphQLString}
//     })
// })




/* ROOT QUERY */
const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

module.exports = schema
