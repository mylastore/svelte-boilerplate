import { writable } from 'svelte/store'
import {getCookie} from '@lib/auth'

function storeUser() {
  const user = getCookie('user')
  const localData = user ? JSON.parse(user) : null
  const { subscribe, set, update  } = writable(localData)

  return {
    subscribe,
    setUser: (data) => set(data)
  }
}

export const user = storeUser();