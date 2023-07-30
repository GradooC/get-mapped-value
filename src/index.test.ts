import { getMappedValue } from '.';

describe('getMappedValue', () => {
    const map = {
        one: 1,
        TWO: 2,
    } as const;

    test.each([
        { map, key: 'one', expected: 1 },
        { map, key: 'ONE', options: { normalizingMethod: 'toLowerCase' } as const, expected: 1 },
        { map, key: 'three', options: { defaultKey: 'one' } as const, expected: 1 },
        { map, key: 'two', options: { normalizingMethod: 'toUpperCase' } as const, expected: 2 },
        { map, key: 'TWO', options: { normalizingMethod: 'toLowerCase', defaultKey: 'one' } as const, expected: 1 },
        { map, key: 'three', expected: undefined },
    ])('getMappedValue($map, $key, $options)', ({ map, key, options, expected }) => {
        expect(getMappedValue(map, key, options)).toBe(expected);
    });
});
