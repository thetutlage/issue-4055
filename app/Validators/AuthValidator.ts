import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // email: schema.string({}, [
    //   rules.email(),
    //   rules.required(),
    //   rules.minLength(8),
    //   rules.maxLength(255),
    // ]),

    // nickname: schema.string({}, [rules.required(), rules.minLength(4), rules.maxLength(64)]),

    password: schema.string({}, [
      rules.required(),
      rules.password(),
      rules.confirmed(),
      rules.minLength(8),
      rules.maxLength(255),
    ]),
  })

  public messages: CustomMessages = {
    'email.unique': 'Incomplete authentication, choose another email address',
    'required': 'The {{ field }} is required to create a new account',
    'minLength': '{{ field }} must be at least {{ options.minLength }} characters long',
    'maxLength': '{{ field }} must be less then {{ options.maxLength }} characters long',
    'password_confirmation.confirmed': 'The password and the confirmation password must be equals',
  }
}
