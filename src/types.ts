export type Methods = "toLowerCase" | "toUpperCase";
export type Options<D, M> = { defaultKey?: D; normalizingMethod?: M };
export type OptionsWithKey<D> = { defaultKey: D; normalizingMethod?: undefined };
export type OptionsWithMethod<M> = { defaultKey?: undefined; normalizingMethod: M };
export type FullOptions<D, M> = { defaultKey: D; normalizingMethod: M };

type Nullable<T> = T | undefined;

type AllValues<O extends Record<string, unknown>> = O[keyof O] | undefined;

type DefaultValue<O extends Record<string, unknown>, D extends Nullable<keyof O>> = D extends undefined
    ? undefined
    : O[NonNullable<D>];

type DefaultMethod<O extends Record<string, unknown>, T extends string, D extends Nullable<keyof O>> = {
    [K in T]: K extends `${Exclude<keyof O, symbol>}` ? O[K] : DefaultValue<O, D>;
}[T];

type MappedMethod<
    O extends Record<string, unknown>,
    T extends string,
    D extends Nullable<keyof O>,
    M extends Methods
> = {
    toLowerCase: {
        [K in T]: Lowercase<K> extends `${Exclude<keyof O, symbol>}` ? O[Lowercase<K>] : DefaultValue<O, D>;
    }[T];
    toUpperCase: {
        [K in T]: Uppercase<K> extends `${Exclude<keyof O, symbol>}` ? O[Uppercase<K>] : DefaultValue<O, D>;
    }[T];
}[M];

type MappedValue<
    O extends Record<string, unknown>,
    T extends string,
    D extends Nullable<keyof O>,
    M extends Nullable<Methods>
> = M extends undefined ? DefaultMethod<O, T, D> : MappedMethod<O, T, D, NonNullable<M>>;

export type MapperResult<
    O extends Record<string, unknown>,
    T extends string,
    D extends Nullable<keyof O>,
    M extends Nullable<Methods>
> = string extends T ? AllValues<O> : MappedValue<O, T, D, M>;
