// import { createSchema } from 'graphql-yoga'
// const fetch = require('node-fetch')

// const schema = createSchema({
//     typeDefs:`
//     type Query {
//         getSluggingByYear(year: Int!): SluggingLeadersByYearType
//     }

//     type SluggingLeadersByYearType {
//         copyright: String
//         stats: [StatsType]
//         playPool: String
//     }

//     type StatsType {
//         type: String
//         group: String
//         totalSplits: Int
//         exemptions: [String]
//         splits: [SplitsType]
//     }

//     type SplitsType {
//         season: String
//         stat: StatType
//         team: TeamType
//         player: PlayerType
//         league: LeagueType
//         sport: SportType
//         numTeams: Int
//         rank: Int
//         position: PositionType
//     }

//     type StatType {
//         gamesPlayed: Int
//         groundOuts: Int
//         airOuts: Int
//         runs: Int
//         doubles: Int
//         triples: Int
//         homeRuns: Int
//         strikeOuts: Int
//         baseOnBalls: Int
//         intentionalWalks: Int
//         hits: Int
//         hitByPitch: Int
//         avg: Float
//         atBats: Int
//         obp: Float
//         slg: Float
//         ops: Float
//         caughtStealing: Int
//         stolenBases: Int
//         stolenBasePercentage: Float
//         groundIntoDoublePlay: Int
//         numberOfPitches: Int
//         plateAppearances: Int
//         totalBases: Int
//         rbi: Int
//         leftOnBase: Int
//         sacBunts: Int
//         sacFlies: Int
//         babip: Float
//         gorundOutsToAirOuts: Float
//         catchersInterference: Int
//         atBatsPerHomeRun: Float
//     }

//     type TeamType {
//         id: Int
//         name: String
//         link: String
//     }

//     it('check if type Team has correct fields', () => {
//       expect(TeamType).toBe({
//         id: Int
//         name: String
//         link: String
//       })
//     })

//     type PlayerType {
//         id: Int
//         fullName: String
//         link: String
//         firstName: String
//         lastName: String
//     }

//     type LeagueType {
//         id: Int
//         name: String
//         link: String
//     }

//     type SportType {
//         id: Int
//         link: String
//         abbreviation: String
//     }

//     type PositionType {
//         code: String
//         name: String
//         type: String
//         abbreviation: String
//     }

//     `,
//     resolvers: {
//         splits: {
//             player: async (parent, args) => {
//                 const response = await fetch(`https://statsapi.mlb.com/api/v1/stats?stats=Season&group=hitting&season=${args.year}&limit=100&sortStat=slg&hydrate&metrics&fields`)
//                 return response.json()
//             }
//         },
//       Query: {
//         hello: () => "world!",
//       },
//     },
//   });
