import React, { createContext, useEffect, useState } from 'react'
import { UserFormData } from './UserForm'

export interface User {
  id: number
  username: string
  active: boolean
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
}

interface UserContextProps {
  users: User[]
  addUser: (user: UserFormData) => void
  changeUser: (user: UserFormData & { id: User['id'] }) => void
  removeUser: (id: User['id']) => void
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    const data = await fetch('/data/users.json')
    setUsers(await data.json())
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = (user: UserFormData) =>
    setUsers([
      ...users,
      {
        ...user,
        id: users.length,
        active: true,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
    ])
  const changeUser = (user: UserFormData & { id: User['id'] }) =>
    setUsers(
      users.map((u) =>
        u.id === user.id
          ? { ...u, ...user, updatedAt: new Date(Date.now()).toISOString() }
          : u
      )
    )
  const removeUser = (id: User['id']) =>
    setUsers(users.filter((u) => u.id !== id))

  return (
    <UserContext.Provider value={{ users, addUser, changeUser, removeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
