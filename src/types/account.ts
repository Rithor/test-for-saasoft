export interface TagItem {
  text: string
}

export type AccountType = 'LDAP' | 'local'

export interface AccountErrors {
  login?: string
  password?: string
}

export interface Account {
  id: string
  tags: TagItem[]
  type: AccountType
  login: string
  password: string | null
  errors: AccountErrors
}

export interface AccountUpdateFields {
  tags?: TagItem[]
  type?: AccountType
  login?: string
  password?: string | null
  errors?: AccountErrors
}
