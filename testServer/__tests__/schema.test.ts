//need proper imports for tests here
import {describe, expect, test} from '@jest/globals';

describe('schema type checks', () => {
    test('type such and such should have the correct types', () => {
        expect(TeamType).toBe(`type TeamType {
              id: Int
              name: String
              link: String
            }`);
    });
});




// it('check if type Team has correct fields', () => {
// expect(TeamType).toBe(type TeamType {
//   id: Int
//   name: String
//   link: String
// })
// })