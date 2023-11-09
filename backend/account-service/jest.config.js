"use strict";

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    
    clearMocks: true,

    collectCoverage: true,

    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

    coverageDirectory: "coverage",
    coverageProvider: "v8",

    coverageReporters: [
        "text-summary",
        "lcov",
    ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/'}),
    preset: 'ts-jest',
    setupFiles: ["dotenv/config", "tsconfig-paths/register"],
    testMatch: [
        "**/__tests__/**/*.ts",
    ],
};
exports.default = config;
