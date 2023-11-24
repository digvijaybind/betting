import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    'https://api.sports.roanuz.com/v5/core/RS_P_1650435056524726286/graphql/',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
