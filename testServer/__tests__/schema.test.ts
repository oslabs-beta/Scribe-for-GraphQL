//need proper imports for tests here
import {describe, expect, test} from '@jest/globals';
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs  = require('../schema')

// describe('schema type checks', () => {
//     test('type such and such should have the correct types', () => {
//     const schema = makeExecutableSchema({ typeDefs });
//     const TeamType = schema.getType('TeamType');


//     expect(TeamType).toBeDefined();
//     expect(TeamType.getFields().id.type.name).toBe('Int');
//     expect(TeamType.getFields().name.type.name).toBe('String');
//     expect(TeamType.getFields().link.type.name).toBe('String');
//     expect(TeamType.getFields().string.type.name).toBe('String');
//     });
// });
describe('Schema Types Are Correct', () => {
    const schema = makeExecutableSchema({ typeDefs });
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