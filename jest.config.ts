/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    // множество разных настроек
        transform: {
          // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью `ts-jest`
          // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
          '^.+\\.tsx?$': [
            'ts-jest',
            {
              // настройки для ts-jest
            },
          ],
        },
        moduleNameMapper: {
          '^@api$': '<rootDir>/src/utils/burger-api.ts',
          '^@utils-types$': '<rootDir>/src/utils/types.ts'
        }
};

export default config;