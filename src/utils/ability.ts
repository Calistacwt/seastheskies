import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability'

import { Abilities, Actions } from '@/config/enums'

export type Ability = MongoAbility<[Actions, Abilities]>

export function ability(scopes: string[]): Ability {
  const { can, build } = new AbilityBuilder<Ability>(createMongoAbility)

  scopes.forEach((scope) => {
    can(Actions.Access, scope as Abilities)
  })

  return build({
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: (object: any) => object!.type,
  })
}
