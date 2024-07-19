import React, { createContext, useState } from 'react'

export interface User {
  id: number
  username: string
  active: boolean
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  password: string
}

interface UserContextProps {
  users: User[]
  addUser: (user: User) => void
  changeUser: (user: User) => void
  removeUser: (id: number) => void
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(data)

  const addUser = (user: User) => setUsers([...users, user])
  const changeUser = (user: User) =>
    setUsers(users.map((u) => (u.id === user.id ? user : u)))
  const removeUser = (id: number) => setUsers(users.filter((u) => u.id !== id))

  return (
    <UserContext.Provider value={{ users, addUser, changeUser, removeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

const data = [
  {
    id: 1,
    username: 'username',
    active: true,
    firstName: 'User',
    lastName: 'Name',
    email: 'mail@mail.com',
    createdAt: new Date(Date.now()),
    password: '',
  },
  {
    id: 12,
    username: 'username',
    active: true,
    firstName: 'User',
    lastName: 'Name',
    email: 'mail@mail.com',
    createdAt: new Date(Date.now()),
    password: '',
  },
]
