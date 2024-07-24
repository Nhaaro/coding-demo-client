import React, { createContext, useEffect, useState } from 'react'

export interface User {
  id: number
  username: string
  active: boolean
  firstName: string
  lastName: string
  email: string
  createdAt: string
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
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    const data = await fetch('/data/users.json')
    setUsers(await data.json())
  }
  useEffect(() => {
    fetchUsers()
  }, [])

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
