//need proper imports for tests here
import {describe, expect, test} from '@jest/globals';
const { makeExecutableSchema, addMocksToSchema } = require('graphql-tools');
const typeDefs  = require('../schema')
const resolvers = require('../schema')
import * as casual from "casual"


describe('Resolvers return the correct values', () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers})
  const mocks = { 
    String: () => casual.sentence,
    Int: () => casual.integer(1,100),
    Float: () => 22.7,
    Boolean: () => casual.boolean,
    //If you'd like more specific mocks for any of your fields, feel free to add them below, using this as an example:
    /*
    User: () => ({ id: casual.uuid, name: casual.name, email: casual.email, age: casual.integer(18,100),}),

    Please refer to the npm package 'casual' for random javascript generator calls.
    */
  }
  const preserveResolvers = true;
  const mockedSchema = addMocksToSchema({
    schema,
    mocks,
    preserveResolvers
  })
  

})

describe('Schema Types Are Correct', () => {
  const schema = makeExecutableSchema({ typeDefs });
      test('Query should have the correct types', () => {
        const type = schema.getType('Query');
        expect(type).toBeDefined();
        
        expect(type.getFields().SluggingLeadersByYear.type.name).toBe('SluggingLeadersByYearType');
          expect(type.getFields().LeaderCategoriesCareer.type.name).toBe('LeaderCategoriesCareerType');
          
        })
      test('SluggingLeadersByYearType should have the correct types', () => {
        const type = schema.getType('SluggingLeadersByYearType');
        expect(type).toBeDefined();
        
        expect(type.getFields().copyright.type.name).toBe('String');
          expect(JSON.stringify(type.getFields().stats.type)).toBe(JSON.stringify("[StatsType]"));
              expect(type.getFields().playPool.type.name).toBe('String');
          
        })
      test('StatsType should have the correct types', () => {
        const type = schema.getType('StatsType');
        expect(type).toBeDefined();
        
        expect(type.getFields().type.type.name).toBe('String');
          expect(type.getFields().group.type.name).toBe('String');
          expect(type.getFields().totalSplits.type.name).toBe('Int');
          expect(JSON.stringify(type.getFields().exemptions.type)).toBe(JSON.stringify("[String]"));
              expect(type.getFields().splits.type.name).toBe('SplitsType');
          
        })
      test('SplitsType should have the correct types', () => {
        const type = schema.getType('SplitsType');
        expect(type).toBeDefined();
        
        expect(type.getFields().season.type.name).toBe('String');
          expect(type.getFields().stat.type.name).toBe('StatType');
          expect(type.getFields().team.type.name).toBe('TeamType');
          expect(type.getFields().player.type.name).toBe('PlayerType');
          expect(type.getFields().league.type.name).toBe('LeagueType');
          expect(type.getFields().sports.type.name).toBe('SportType');
          expect(type.getFields().numTeams.type.name).toBe('Int');
          expect(type.getFields().rank.type.name).toBe('Int');
          expect(type.getFields().position.type.name).toBe('PositionType');
          
        }),
      test('StatType should have the correct types', () => {
        const type = schema.getType('StatType');
        expect(type).toBeDefined();
        
        expect(type.getFields().gamesPlayed.type.name).toBe('Int');
          expect(type.getFields().groundOuts.type.name).toBe('Int');
          expect(type.getFields().airOuts.type.name).toBe('Int');
          expect(type.getFields().runs.type.name).toBe('Int');
          expect(type.getFields().doubles.type.name).toBe('Int');
          expect(type.getFields().triples.type.name).toBe('Int');
          expect(type.getFields().homeRuns.type.name).toBe('Int');
          expect(type.getFields().strikeOuts.type.name).toBe('Int');
          expect(type.getFields().baseOnBalls.type.name).toBe('Int');
          expect(type.getFields().intentionalWalks.type.name).toBe('Int');
          expect(type.getFields().hits.type.name).toBe('Int');
          expect(type.getFields().hitByPitch.type.name).toBe('Int');
          expect(type.getFields().avg.type.name).toBe('Float');
          expect(type.getFields().atBats.type.name).toBe('Int');
          expect(type.getFields().obp.type.name).toBe('Float');
          expect(type.getFields().slg.type.name).toBe('Float');
          expect(type.getFields().ops.type.name).toBe('Float');
          expect(type.getFields().caughtStealing.type.name).toBe('Int');
          expect(type.getFields().stolenBases.type.name).toBe('Int');
          expect(type.getFields().stolenBasePercentage.type.name).toBe('Float');
          expect(type.getFields().groundIntoDoublePlay.type.name).toBe('Int');
          expect(type.getFields().numberOfPitches.type.name).toBe('Int');
          expect(type.getFields().plateAppearances.type.name).toBe('Int');
          expect(type.getFields().totalBases.type.name).toBe('Int');
          expect(type.getFields().rbi.type.name).toBe('Int');
          expect(type.getFields().leftOnBase.type.name).toBe('Int');
          expect(type.getFields().sacBunts.type.name).toBe('Int');
          expect(type.getFields().sacFlies.type.name).toBe('Int');
          expect(type.getFields().babip.type.name).toBe('Float');
          expect(type.getFields().groundOutsToAirOuts.type.name).toBe('Float');
          expect(type.getFields().catchersInterference.type.name).toBe('Int');
          expect(type.getFields().atBatsPerHomeRun.type.name).toBe('Float');
          
        })
      test('TeamType should have the correct types', () => {
        const type = schema.getType('TeamType');
        expect(type).toBeDefined();
        
        expect(type.getFields().id.type.name).toBe('Int');
          expect(type.getFields().name.type.name).toBe('String');
          expect(type.getFields().link.type.name).toBe('String');
          expect(JSON.stringify(type.getFields().string.type)).toBe(JSON.stringify("[String]"));
              expect(type.getFields().type.type.name).toBe('PlayerType');
          
        })
      test('PlayerType should have the correct types', () => {
        const type = schema.getType('PlayerType');
        expect(type).toBeDefined();
        
        expect(type.getFields().id.type.name).toBe('Int');
          expect(type.getFields().fullName.type.name).toBe('String');
          expect(type.getFields().link.type.name).toBe('String');
          expect(type.getFields().info.type.name).toBe('String');
          expect(type.getFields().firstName.type.name).toBe('String');
          expect(type.getFields().lastName.type.name).toBe('String');
          
        }),
      test('LeagueType should have the correct types', () => {
        const type = schema.getType('LeagueType');
        expect(type).toBeDefined();
        
        expect(type.getFields().id.type.name).toBe('Int');
          expect(type.getFields().name.type.name).toBe('String');
          expect(type.getFields().link.type.name).toBe('String');
          
        })
      test('SportType should have the correct types', () => {
        const type = schema.getType('SportType');
        expect(type).toBeDefined();
        
        expect(type.getFields().id.type.name).toBe('Int');
          expect(type.getFields().link.type.name).toBe('String');
          expect(type.getFields().abbreviation.type.name).toBe('String');
          
        })
      test('PositionType should have the correct types', () => {
        const type = schema.getType('PositionType');
        expect(type).toBeDefined();
        
        expect(type.getFields().code.type.name).toBe('String');
          expect(type.getFields().name.type.name).toBe('String');
          expect(type.getFields().type.type.name).toBe('String');
          expect(type.getFields().abbreviation.type.name).toBe('String');
          
        })
      test('LeaderCategoriesCareerType should have the correct types', () => {
        const type = schema.getType('LeaderCategoriesCareerType');
        expect(type).toBeDefined();
        
        expect(type.getFields().copyright.type.name).toBe('String');
          expect(JSON.stringify(type.getFields().leagueLeaders.type)).toBe(JSON.stringify("[LeagueLeadersType]"));
              
        })
      test('LeagueLeadersType should have the correct types', () => {
        const type = schema.getType('LeagueLeadersType');
        expect(type).toBeDefined();
        
        expect(type.getFields().leaderCategory.type.name).toBe('String');
          expect(type.getFields().gameType.type.name).toBe('GameTypeType');
          expect(JSON.stringify(type.getFields().leaders.type)).toBe(JSON.stringify("[LeadersType]"));
              expect(type.getFields().statGroup.type.name).toBe('String');
          expect(type.getFields().totalSplits.type.name).toBe('String');
          
        })
      test('GameTypeType should have the correct types', () => {
        const type = schema.getType('GameTypeType');
        expect(type).toBeDefined();
        
        expect(type.getFields().id.type.name).toBe('String');
          expect(type.getFields().description.type.name).toBe('String');
          
        })
      test('LeadersType should have the correct types', () => {
        const type = schema.getType('LeadersType');
        expect(type).toBeDefined();
        
        expect(type.getFields().rank.type.name).toBe('Int');
          expect(type.getFields().value.type.name).toBe('String');
          expect(type.getFields().team.type.name).toBe('TeamType');
          expect(type.getFields().league.type.name).toBe('LeagueType');
          expect(type.getFields().person.type.name).toBe('PlayerType');
          expect(type.getFields().sport.type.name).toBe('SportType');
          expect(type.getFields().numTeams.type.name).toBe('Int');
          
        })
      test('PlayerLinkType should have the correct types', () => {
        const type = schema.getType('PlayerLinkType');
        expect(type).toBeDefined();
        
        expect(type.getFields().copyright.type.name).toBe('String');
          expect(JSON.stringify(type.getFields().people.type)).toBe(JSON.stringify("[PeopleLinkType]"));
              
        })
      test('PeopleLinkType should have the correct types', () => {
        const type = schema.getType('PeopleLinkType');
        expect(type).toBeDefined();
        
        expect(type.getFields().id.type.name).toBe('String');
          expect(type.getFields().fullName.type.name).toBe('String');
          expect(type.getFields().link.type.name).toBe('String');
          expect(type.getFields().firstName.type.name).toBe('String');
          expect(type.getFields().lastName.type.name).toBe('String');
          expect(type.getFields().primaryNumber.type.name).toBe('String');
          expect(type.getFields().birthDate.type.name).toBe('String');
          expect(type.getFields().currentAge.type.name).toBe('Int');
          expect(type.getFields().birthCity.type.name).toBe('String');
          expect(type.getFields().birthStateProvince.type.name).toBe('String');
          expect(type.getFields().birthCOuntry.type.name).toBe('String');
          expect(type.getFields().height.type.name).toBe('String');
          expect(type.getFields().weight.type.name).toBe('Int');
          expect(type.getFields().active.type.name).toBe('Boolean');
          expect(JSON.stringify(type.getFields().primaryPosition.type)).toBe(JSON.stringify("[PrimaryPositionType]"));
              expect(type.getFields().useName.type.name).toBe('String');
          expect(type.getFields().useLastName.type.name).toBe('String');
          expect(type.getFields().middleName.type.name).toBe('String');
          expect(type.getFields().boxScoreName.type.name).toBe('String');
          expect(type.getFields().nickName.type.name).toBe('String');
          expect(type.getFields().gender.type.name).toBe('String');
          expect(type.getFields().isPlyaer.type.name).toBe('Boolean');
          expect(type.getFields().isVerified.type.name).toBe('Boolean');
          expect(type.getFields().deathDate.type.name).toBe('String');
          expect(type.getFields().deathCity.type.name).toBe('String');
          expect(type.getFields().deathStateProvince.type.name).toBe('String');
          expect(type.getFields().deathCountry.type.name).toBe('String');
          expect(type.getFields().lastPlayedDates.type.name).toBe('String');
          expect(type.getFields().mlbDebutDate.type.name).toBe('String');
          expect(JSON.stringify(type.getFields().batSide.type)).toBe(JSON.stringify("[BatSideType]"));
              expect(JSON.stringify(type.getFields().pitchHand.type)).toBe(JSON.stringify("[PitchHandType]"));
              expect(type.getFields().nameFirstLast.type.name).toBe('String');
          expect(type.getFields().nameSlug.type.name).toBe('String');
          expect(type.getFields().firstLastName.type.name).toBe('String');
          expect(type.getFields().lastFirstName.type.name).toBe('String');
          expect(type.getFields().lastInitName.type.name).toBe('String');
          expect(type.getFields().initLastName.type.name).toBe('String');
          expect(type.getFields().fullFMLName.type.name).toBe('String');
          expect(type.getFields().fullLFMName.type.name).toBe('String');
          expect(type.getFields().strikeZoneTop.type.name).toBe('Float');
          expect(type.getFields().strikeZoneBottom.type.name).toBe('Float');
          
        })
      test('PrimaryPositionType should have the correct types', () => {
        const type = schema.getType('PrimaryPositionType');
        expect(type).toBeDefined();
        
        expect(type.getFields().code.type.name).toBe('String');
          expect(type.getFields().name.type.name).toBe('String');
          expect(type.getFields().type.type.name).toBe('String');
          expect(type.getFields().abbreviation.type.name).toBe('String');
          
        })
      test('BatSideType should have the correct types', () => {
        const type = schema.getType('BatSideType');
        expect(type).toBeDefined();
        
        expect(type.getFields().code.type.name).toBe('String');
          expect(type.getFields().description.type.name).toBe('String');
          
        })
      test('PitchHandType should have the correct types', () => {
        const type = schema.getType('PitchHandType');
        expect(type).toBeDefined();
        
        expect(type.getFields().code.type.name).toBe('String');
          expect(type.getFields().description.type.name).toBe('String');
          
        })
});






// `type TeamType {
//     id: Int
//     name: String
//     link: String
//   }`



// it('check if type Team has correct fields', () => {
// expect(TeamType).toBe(type TeamType {
//   id: Int
//   name: String
//   link: String
// })
// })