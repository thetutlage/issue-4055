/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('password', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }

  const patterns = [
    {
      pattern: new RegExp('^(?=.*[a-z])'),
      error: 'The password must contain at least 1 lowercase alphabetical character',
    },
    {
      pattern: new RegExp('^(?=.*[A-Z])'),
      error: 'The password must contain at least 1 uppercase alphabetical character',
    },
    {
      pattern: new RegExp('^(?=.*[0-9])'),
      error: 'The password must contain at least 1 numeric character',
    },
    {
      pattern: new RegExp('(?=.*[!@#$%^&*])'),
      error: 'The password must contain at least one special character',
    },
    {
      pattern: new RegExp(/^\S*$/),
      error: 'The password must not contain white spaces',
    },
  ]

  patterns.forEach(async function (item) {
    if (!item.pattern.test(value)) {
      options.errorReporter.report(
        options.pointer,
        'password',
        item.error,
        options.arrayExpressionPointer
      )
    }
  })
})
