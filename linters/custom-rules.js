module.exports = {
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase']
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE']
      },
      {
        selector: 'class',
        format: ['PascalCase']
      },
      {
        selector: 'objectLiteralProperty',
        format: ['UPPER_CASE', 'camelCase']
      },
      {
        selector: 'interface',
        format: ['PascalCase']
      },
      {
        selector: 'enum',
        format: ['PascalCase']
      },
      {
        selector: 'enumMember',
        format: ['PascalCase', 'UPPER_CASE']
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      }
    ],
    'max-lines-per-function': [
      'error',
      {
        max: 60,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    'max-lines': [
      'error',
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    'id-length': [
      'error',
      { min: 3, exceptions: ['i', 'j', 'id', 'OK', 'OR', 'in'], properties: 'always' }
    ],
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true
      }
    ]
  }
};
