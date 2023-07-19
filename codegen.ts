import { CodegenConfig } from '@graphql-codegen/cli';

const serverUrl = 'http://localhost:3000/graphql'

const config: CodegenConfig = {
  schema: serverUrl,
  documents: ['components/**/*.tsx'],
  generates: {
    './graphql/__generated__/': {
      preset: 'client',
    //   plugins : ['typescript']
    }
  },
  ignoreNoDocuments: true,
};

export default config;