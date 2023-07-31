# Get-mapped-value

Strongly typed utility function for mapping

![NPM License](https://img.shields.io/npm/l/get-mapped-value)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/GradooC/get-mapped-value/publish.yml)
![npm bundle size](https://img.shields.io/bundlephobia/min/get-mapped-value)
![GitHub release (with filter)](https://img.shields.io/github/v/release/GradooC/get-mapped-value)
[![codecov](https://codecov.io/gh/GradooC/get-mapped-value/branch/main/graph/badge.svg?token=Y9QLKW9XZ7)](https://codecov.io/gh/GradooC/get-mapped-value)

## Installation

```shell
npm install get-mapped-value

yarn add get-mapped-value
```

## Basic Usage

```ts
import { getMappedValue } from 'get-mapped-value';

const map = {
    one: 1,
    two: 2,
    three: 3,
};

var key = 'one';
//   ^? var key: string

const resultOne = getMappedValue(map, key); // 1
//     ^? const resultOne: number | undefined

const resultTwo = getMappedValue(map, key, { defaultKey: 'two' }); // 2
//     ^? const resultTwo: number

const resultThree = getMappedValue(map, 'THREE', { normalizingMethod: 'toLowerCase' }); // 3
//     ^? const resultThree: number

const resultUndefined = getMappedValue(map, 'THREE'); // undefined
//     ^? const resultUndefined: undefined
```

But it becomes more powerful when you use const types

```ts
const map = {
    one: 1,
    two: 2,
    three: 3,
} as const;

const resultOne = getMappedValue(map, 'one'); // 1
//     ^? const resultOne: 1

const resultTwo = getMappedValue(map, 'four', { defaultKey: 'two' }); // 2
//     ^? const resultTwo: 2

const resultThree = getMappedValue(map, 'THREE', { normalizingMethod: 'toLowerCase' }); // 3
//     ^? const resultThree: 3

const resultUndefined = getMappedValue(map, 'four'); // undefined
//     ^? const resultUndefined: undefined
```
