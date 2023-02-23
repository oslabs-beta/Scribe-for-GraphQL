
declare var require: any
declare var module: any
const graphql = require('graphql')
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
/* LEADER BY YEAR */
const SluggingLeadersByYearType = new GraphQLObjectType({
    name: 'SluggingLeadersByYearType',
    fields:() => ({
        copyright: {type: GraphQLString},
        stats: {type: new GraphQLList(StatsType)},
        playPool: {type: GraphQLString},
    })
})

const StatsType = new GraphQLObjectType({
    name: 'StatsType',
    fields: () => ({
    type: { type: GraphQLString },
    group: { type: GraphQLString},
    totalSplits: { type: GraphQLInt},
    exemptions: { type: new GraphQLList(GraphQLString) },
    splits: { type: new GraphQLList(SplitsType) }
    })
})

const SplitsType = new GraphQLObjectType({
    name: 'SplitsType',
    fields: () => ({
        season: {type: GraphQLString},
        stat: {type: StatType},
        team: {type: TeamType},
        player: {type: PlayerType},
        league: {type: LeagueType},
        sport: {type: SportType},
        numTeams: {type: GraphQLInt},
        rank: {type: GraphQLInt},
        position: {type: PositionType},
    })
})

const StatType = new GraphQLObjectType({
    name: 'StatType',
    fields: () => ({
        gamesPlayed:{type: GraphQLInt},
        groundOuts: {type: GraphQLInt},
        airOuts: {type: GraphQLInt},
        runs: {type: GraphQLInt},
        doubles: {type: GraphQLInt},
        triples: {type: GraphQLInt},
        homeRuns: {type: GraphQLInt},
        strikeOuts: {type: GraphQLInt},
        baseOnBalls: {type: GraphQLInt},
        intentionalWalks: {type: GraphQLInt},
        hits: {type: GraphQLInt},
        hitByPitch: {type: GraphQLInt},
        avg: {type: GraphQLFloat},
        atBats: {type: GraphQLInt},
        obp: {type: GraphQLFloat},
        slg: {type: GraphQLFloat},
        ops: {type: GraphQLFloat},
        caughtStealing: {type: GraphQLInt},
        stolenBases: {type: GraphQLInt},
        stolenBasePercentage: {type: GraphQLFloat},
        groundIntoDoublePlay: {type: GraphQLInt},
        numberOfPitches: {type: GraphQLInt},
        plateAppearances: {type: GraphQLInt},
        totalBases: {type: GraphQLInt},
        rbi: {type: GraphQLInt},
        leftOnBase: {type: GraphQLInt},
        sacBunts: {type: GraphQLInt},
        sacFlies: {type: GraphQLInt},
        babip: {type: GraphQLFloat},
        gorundOutsToAirOuts: {type: GraphQLFloat},
        catchersInterference: {type: GraphQLInt},
        atBatsPerHomeRun: {type: GraphQLFloat},
    })
})

const TeamType = new GraphQLObjectType({
    name: 'TeamType',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        link: {type: GraphQLString}
    })
})

const PlayerType = new GraphQLObjectType({
    name: 'PlayerType',
    fields: () => ({
        id: {type: GraphQLInt},
        fullName: {type: GraphQLString},
        link: {type: GraphQLString},
        info: {type: new GraphQLObjectType({
            name: 'PlayerInfo',
            fields: () => ({
            copyright: {type: GraphQLString},
            people: {type: new GraphQLList(PeopleLinkType)}
            })
        }),
        resolve: (parent, args) => {
            const link = parent.link;
            return fetchPlayerLink(link)
            }
        },
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString}
    })
})

const LeagueType = new GraphQLObjectType({
    name: 'LeagueType',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        link: {type: GraphQLString}
    })
})

const SportType = new GraphQLObjectType({
    name: 'SportType',
    fields: () => ({
        id: {type: GraphQLInt},
        link: {type: GraphQLString},
        abbreviation: {type: GraphQLString},
    })
})


const PositionType = new GraphQLObjectType({
    name: 'PositionType',
    fields: () => ({
        code: {type: GraphQLString},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        abbreviation: {type: GraphQLString}
    })
})
/* LEADER CATEGORIES */
function fetchLeaderCategoriesCareerBatting(stat) {
    return fetch(`https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=slg&statType=career&limit=100&statGroup=hitting`).then(res=> res.json())
}

const LeaderCategoriesCareerType = new GraphQLObjectType({
    name: 'LeaderCategoriesCareerType',
    fields: () => ({
        copyright: {type: GraphQLString},
        leagueLeaders: {type: new GraphQLList(LeagueLeadersType)},
    })
})

const LeagueLeadersType = new GraphQLObjectType({
    name: 'LeagueLeadersType',
    fields: () => ({
        leaderCategory: {type: GraphQLString},
        gameType: {type: GameTypeType},
        leaders: {type: new GraphQLList(LeadersType)},
        statGroup: {type: GraphQLString},
        totalSplits: {type: GraphQLString},
    })
})

const GameTypeType = new GraphQLObjectType({
    name: 'GameTypeType',
    fields:() => ({
        id: {type: GraphQLString},
        description: {type: GraphQLString},
    })
})

const LeadersType = new GraphQLObjectType({
    name: 'LeadersType',
    fields:() => ({
        rank: {type: GraphQLInt},
        value: {type: GraphQLString},
        team: {type: TeamType},
        league: {type: LeagueType},
        person: {type: PlayerType},
        sport: {type: SportType},
        numTeams: {type: GraphQLInt}
    })
})

/* LINK TYPES */
const PlayerLinkType = new GraphQLObjectType({
    name: 'PlayerLinkType',
    fields: () => ({
        copyright: {type: GraphQLString},
        people: {type: new GraphQLList(PeopleLinkType)}
    })
})

const PeopleLinkType = new GraphQLObjectType({
    name: 'PeopleLinkType',
    fields: () => ({
        id: {type: GraphQLString},
        fullName: {type: GraphQLString},
        link: {type: GraphQLString},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        primaryNumber: {type: GraphQLString},
        birthDate: {type: GraphQLString},
        currentAge: {type: GraphQLInt},
        birthCity: {type: GraphQLString},
        birthStateProvince: {type: GraphQLString},
        birthCountry: {type: GraphQLString},
        height: {type: GraphQLString},
        weight: {type: GraphQLInt},
        active: {type: GraphQLBoolean},
        primaryPosition: {type: new GraphQLList(PrimaryPositionType)},
        useName: {type: GraphQLString},
        useLastName: {type: GraphQLString},
        middleName: {type: GraphQLString},
        boxScoreName: {type: GraphQLString},
        nickName: {type: GraphQLString},
        gender: {type: GraphQLString},
        isPlayer: {type: GraphQLBoolean},
        isVerified: {type: GraphQLBoolean},
        deathDate: {type: GraphQLString},
        deathCity: {type: GraphQLString},
        deathStateProvince: {type: GraphQLString},
        deathCountry: {type: GraphQLString},
        lastPlayedDate: {type: GraphQLString},
        mlbDebutDate: {type: GraphQLString},
        batSide: {type: new GraphQLList(BatSideType)},
        pitchHand: {type: new GraphQLList(PitchHandType)},
        nameFirstLast: {type: GraphQLString},
        nameSlug: {type: GraphQLString},
        firstLastName: {type: GraphQLString},
        lastFirstName: {type: GraphQLString},
        lastInitName: {type: GraphQLString},
        initLastName: {type: GraphQLString},
        fullFMLName: {type: GraphQLString},
        fullLFMName: {type: GraphQLString},
        strikeZoneTop: {type: GraphQLFloat},
        strikeZoneBottom: {type: GraphQLFloat},
    })
})

const PrimaryPositionType = new GraphQLObjectType({
    name: 'PrimaryPositionType',
    fields: () => ({
        code: {type: GraphQLString},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        abbreviation: {type: GraphQLString},
    })
})

const BatSideType = new GraphQLObjectType({
    name: 'BatSideType',
    fields: () => ({
        code: {type: GraphQLString},
        description: {type: GraphQLString},
    })
})

const PitchHandType = new GraphQLObjectType({
    name: 'PitchHandType',
    fields: () => ({
        code: {type: GraphQLString},
        description: {type: GraphQLString},
    })
})

function fetchPlayerLink(endpoint) {
    return fetch(`https://statsapi.mlb.com/${endpoint}`).then(res=> res.json())
}

/* ROOT QUERY */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        SluggingLeadersByYear:{
            type: SluggingLeadersByYearType,
            args: {year: {type: GraphQLInt}},
            resolve: (root, args) => {
               return fetchSluggingLeaderboardByYear(args.year)
            }
        }, 
        LeaderCategoriesCareer: {
            type: LeaderCategoriesCareerType,
            args: {stat: {type: GraphQLString}},
            resolve: (root, args) => {
                return fetchLeaderCategoriesCareerBatting(args.stat)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
