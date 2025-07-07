import type { Account, AccountType, AccountUpdateFields, TagItem } from '@/types/account'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const isValidAccountType = (value: string): value is AccountType => {
  return value === 'LDAP' || value === 'local'
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const loadFromStorage = (): void => {
    const stored = localStorage.getItem('accounts')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Account[]
        accounts.value = parsed
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
      }
    }
  }

  const saveToStorage = (): void => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  const addAccount = (): string => {
    const newAccount: Account = {
      id: Date.now().toString(),
      tags: [],
      type: 'local',
      login: '',
      password: '',
      errors: {},
    }
    accounts.value.push(newAccount)
    saveToStorage()
    return newAccount.id
  }

  const updateAccount = (id: string, updates: AccountUpdateFields): void => {
    const index = accounts.value.findIndex((account) => account.id === id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updates }
      saveToStorage()
    }
  }

  const removeAccount = (id: string): void => {
    const index = accounts.value.findIndex((account) => account.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
      saveToStorage()
    }
  }

  const parseTagsFromString = (tagsString: string): TagItem[] => {
    if (!tagsString.trim()) return []

    return tagsString
      .split(';')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .map((tag) => ({ text: tag }))
  }

  const tagsToString = (tags: TagItem[]): string => {
    return tags.map((tag) => tag.text).join('; ')
  }

  loadFromStorage()

  return {
    accounts: computed(() => accounts.value),
    addAccount,
    updateAccount,
    removeAccount,
    parseTagsFromString,
    tagsToString,
    loadFromStorage,
  }
})
