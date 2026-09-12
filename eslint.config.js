import js from '@eslint/js';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default typescriptEslint.config(
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.angular',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/*.json',
    ],
  },
  {
    files: ['**/*.ts'],
    extends: [
      js.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Reglas generales y de TypeScript
      curly: ['error', 'all'],
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      //'@typescript-eslint/no-magic-numbers': [
      //  'error',
      //  {
      //    ignoreEnums: true,
      //    ignoreReadonlyClassProperties: true,
      //    ignore: [-1, 0, 1],
      //  },
      //],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: "No utilices el enum nativo. Usa un objeto (POJO) con 'as const' en su lugar.",
        },
      ],

      // Reglas de Angular
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      // Ordenamiento de importaciones
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@angular', '^@?\\w'],
            ['^src/shared/'],
            ['^src/shared/.*/domain/'],
            ['^src/shared/.*/infrastructure/'],
            ['^src/shared/.*/application/'],
            ['^src/features/.*/domain/'],
            ['^src/features/.*/infrastructure/'],
            ['^src/features/.*/application/'],
            ['^src/'],
          ],
        },
      ],

      // Restricción de rutas relativas globales
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', './*', '..', '.'],
              message:
                'Las rutas relativas están prohibidas. Utiliza rutas absolutas comenzando con "src/".',
            },
          ],
        },
      ],
    },
  },
  // Reglas para los Templates HTML de Angular
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
  // Restricciones de Clean Architecture
  //{
  //  files: ['**/domain/**/*.ts'],
  //  rules: {
  //    'no-restricted-imports': [
  //      'error',
  //      {
  //        patterns: [
  //          {
  //            group: ['**/infrastructure/**', '**/presentation/**', '**/di/**', '@angular/**'],
  //            message:
  //              'El Domain no debe depender de Infrastructure, Presentation, DI, ni del framework.',
  //          },
  //          {
  //            group: ['../*', './*', '..', '.'],
  //            message:
  //              'Las rutas relativas están prohibidas. Utiliza rutas absolutas comenzando con "src/".',
  //          },
  //        ],
  //      },
  //    ],
  //  },
  //},
  //{
  //  files: ['**/application/**/*.ts'],
  //  rules: {
  //    'no-restricted-imports': [
  //      'error',
  //      {
  //        patterns: [
  //          {
  //            group: ['**/infrastructure/**', '**/presentation/**', '**/di/**'],
  //            message:
  //              'Application solo debe interactuar con el Domain, no con Infrastructure o Presentation.',
  //          },
  //          {
  //            group: ['../*', './*', '..', '.'],
  //            message:
  //              'Las rutas relativas están prohibidas. Utiliza rutas absolutas comenzando con "src/".',
  //          },
  //        ],
  //      },
  //    ],
  //  },
  //},
  // {
  //   files: ['**/infrastructure/**/*.ts'],
  //   rules: {
  //     'no-restricted-imports': [
  //       'error',
  //       {
  //         patterns: [
  //           {
  //             group: ['**/presentation/**', '**/di/**'],
  //             message: 'Infrastructure no debe conocer la UI (Presentation) ni DI.',
  //           },
  //           {
  //             group: ['../*', './*', '..', '.'],
  //             message:
  //               'Las rutas relativas están prohibidas. Utiliza rutas absolutas comenzando con "src/".',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //},
  // Integración con Prettier (siempre al final)
  prettierPluginRecommended,
);
