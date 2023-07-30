import type { FullOptions, MapperResult, Methods, Options, OptionsWithKey, OptionsWithMethod, NeverOptions } from './types';

/**
 * Strongly typed utility function for mapping values
 *
 * @param map Mapping object
 * @param key Key of the object to get a value from
 * @param options Mapping options
 * @returns Returns the value of the giving key or undefined
 * @example
 *
 * getMappedValue({ one: 1 }, 'one'); // 1
 *
 * getMappedValue({ one: 1 }, 'two'); // undefined
 *
 * getMappedValue({ one: 1 }, 'ONE', { normalizingMethod: 'toLowerCase' }); // 1
 *
 * getMappedValue({ one: 1 }, 'ONE', { defaultKey: 'one' }); // 1
 *
 * getMappedValue({ one: 1 }, 'two', { normalizingMethod: 'toUpperCase' }); // undefined
 *
 */
export function getMappedValue<O extends Record<string, unknown>, T extends string>(map: O, key: T): MapperResult<O, T, undefined, undefined>;
export function getMappedValue<O extends Record<string, unknown>, T extends string, D extends keyof O>(map: O, key: T, options: OptionsWithKey<D>): MapperResult<O, T, D, undefined>;
export function getMappedValue<O extends Record<string, unknown>, T extends string, M extends Methods>(map: O, key: T, options: OptionsWithMethod<M>): MapperResult<O, T, undefined, M>;
export function getMappedValue<O extends Record<string, unknown>, T extends string, D extends keyof O, M extends Methods>(map: O, key: T, options: FullOptions<D, M>): MapperResult<O, T, D, M>;
export function getMappedValue<O extends Record<string, unknown>, T extends string, D extends keyof O, M extends Methods>(map: O, key: T, options?: NeverOptions<D, M>): never;
export function getMappedValue<O extends Record<string, unknown>, T extends string, D extends keyof O, M extends Methods>(map: O, key: T, options: Options<D, M> = {}) {
    const { defaultKey, normalizingMethod } = options;

    const formattedKey = normalizingMethod ? key[normalizingMethod]() : key;
    const defaultValue = defaultKey && map[defaultKey];

    return map[formattedKey] || defaultValue;
}
