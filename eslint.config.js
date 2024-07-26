import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
      quotes: ['error', 'single', { allowTemplateLitterals: true }],
      semi: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'sort-vars': ['error', { ignoreCase: true }],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
      'require-await': 'error', //Interdire les fonctions asynchrones qui n'ont pas  d'expression await
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
      ], //Exiger une déstructuration des tableaux et/ou des objets
      'no-unused-expressions': 'error', //Interdire les expressions inutilisées
      'no-return-assign': 'error', //Interdire les opérations d'affectation dans return les instructions
      'no-nested-ternary': 'error', //Interdire les expressions ternaires imbriquées
      camelcase: ['error', { properties: 'always' }], // Ecriture des noms de variables en camelcase
      'arrow-body-style': ['error', 'always'], //Exiger des accolades autour des corps de fonction fléchés
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
];
