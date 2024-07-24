import { getByRole, render, screen, waitFor } from '@testing-library/react'
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from 'react-router-dom'
import UserProvider from './UserContext.tsx'
import UsersPage from './UsersPage.tsx'
import userEvent from '@testing-library/user-event'
import UserForm from './UserForm.tsx'
import UserDetails from './UserDetails.tsx'

const testUsers = [
  {
    id: 1,
    username: 'username',
    active: true,
    firstName: 'User',
    lastName: 'Name',
    email: 'mail@mail.com',
    createdAt: '2024-07-16T11:38:14.000Z',
  },
  {
    id: 12,
    username: 'otheruser',
    active: true,
    firstName: 'Another',
    lastName: 'User',
    email: 'other@mail.com',
    createdAt: '2024-07-19T09:55:22.000Z',
  },
]

describe('UsersPage', () => {
  beforeEach(() => {
    fetchMock.mockResponse(JSON.stringify(testUsers))
  })

  describe('presentation', () => {
    test('it renders', async () => {
      await waitFor(() => {
        render(
          <UserProvider>
            <MemoryRouter>
              <UsersPage />
            </MemoryRouter>
          </UserProvider>
        )
      })
    })
    test('it can render with not data', async () => {
      fetchMock.mockResponse(JSON.stringify([]))
      await waitFor(() => {
        render(
          <UserProvider>
            <MemoryRouter>
              <UsersPage />
            </MemoryRouter>
          </UserProvider>
        )
      })
      await waitFor(() => {}) // fetch users in UserContext
      await waitFor(() => {
        expect(
          screen.queryByRole('row', { name: /Select row/i })
        ).not.toBeInTheDocument()
      })

      expect(screen.getByRole('rowgroup')).toMatchSnapshot()
    })

    test('bulk delete is disabled by default', async () => {
      await waitFor(() => {
        render(
          <UserProvider>
            <MemoryRouter>
              <UsersPage />
            </MemoryRouter>
          </UserProvider>
        )
      })

      const deleteUsersButton = screen.getByRole('button', {
        name: /Users.Actions.DeleteUserBulk/i,
      })

      expect(deleteUsersButton).toBeDisabled()
    })

    test('table starts with correct data', async () => {
      await waitFor(() => {
        render(
          <UserProvider>
            <MemoryRouter>
              <UsersPage />
            </MemoryRouter>
          </UserProvider>
        )
      })
      await waitFor(() => {}) // fetch users in UserContext
      await waitFor(() => {
        expect(
          screen.getAllByRole('row', { name: /Select row/i })[0]
        ).toBeInTheDocument()
      })

      const rows = screen.getAllByRole('row', { name: /Select row/i })

      expect(rows).toMatchSnapshot()
    })

    test('bulk delete button activates on row selection', async () => {
      await waitFor(() => {
        render(
          <UserProvider>
            <MemoryRouter>
              <UsersPage />
            </MemoryRouter>
          </UserProvider>
        )
      })
      await waitFor(() => {}) // fetch users in UserContext
      await waitFor(() => {
        expect(
          screen.getAllByRole('row', { name: /Select row/i })[0]
        ).toBeInTheDocument()
      })

      const deleteUsersButton = screen.getByRole('button', {
        name: /Users.Actions.DeleteUserBulk/i,
      })

      expect(deleteUsersButton).toBeDisabled()

      const [firstRow] = screen.getAllByRole('row', { name: /Select row/i })
      const rowSelectCheckbox = getByRole(firstRow, 'checkbox')
      await userEvent.click(rowSelectCheckbox)

      expect(deleteUsersButton).not.toBeDisabled()
    })
  })

  describe('navigation', () => {
    test('Create User button navigates correctly', async () => {
      let router = createMemoryRouter(
        [
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'users/create',
            element: <UserForm />,
          },
          {
            path: 'users/:userId',
            element: <UserDetails />,
          },
          {
            path: 'users/:userId/edit',
            element: <UserForm />,
          },
        ],
        {
          initialEntries: ['/users'],
        }
      )

      await waitFor(() => {
        render(
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        )
      })

      const createUserButton = screen.getByRole('link', {
        name: /Users.Actions.CreateUser/i,
      })
      expect(createUserButton).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: /Users.Actions.SaveUser/i })
      ).not.toBeInTheDocument()

      await userEvent.click(createUserButton)

      expect(
        screen.getByRole('button', { name: /Users.Actions.SaveUser/i })
      ).toBeInTheDocument()
    })

    test('Username link navigates correctly', async () => {
      let router = createMemoryRouter(
        [
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'users/create',
            element: <UserForm />,
          },
          {
            path: 'users/:userId',
            element: <UserDetails />,
          },
          {
            path: 'users/:userId/edit',
            element: <UserForm />,
          },
        ],
        {
          initialEntries: ['/users'],
        }
      )

      await waitFor(() => {
        render(
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        )
      })

      await waitFor(() => {}) // fetch users in useContext
      await waitFor(() => {
        expect(
          screen.getAllByRole('row', { name: /Select row/i })[0]
        ).toBeInTheDocument()
      })

      const [firstRow] = screen.getAllByRole('row', { name: /Select row/i })
      const usernameLink = getByRole(firstRow, 'link')
      expect(usernameLink).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: /Users.Actions.UpdateUser/i })
      ).not.toBeInTheDocument()

      await userEvent.click(usernameLink)

      expect(
        screen.getByRole('button', { name: /Users.Actions.UpdateUser/i })
      ).toBeInTheDocument()
    })

    test('Edit User button navigates correctly', async () => {
      let router = createMemoryRouter(
        [
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'users/create',
            element: <UserForm />,
          },
          {
            path: 'users/:userId',
            element: <UserDetails />,
          },
          {
            path: 'users/:userId/edit',
            element: <UserForm />,
          },
        ],
        {
          initialEntries: ['/users'],
        }
      )

      await waitFor(() => {
        render(
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        )
      })

      await waitFor(() => {}) // fetch users in useContext
      await waitFor(() => {
        expect(
          screen.getAllByRole('row', { name: /Select row/i })[0]
        ).toBeInTheDocument()
      })

      const [firstRow] = screen.getAllByRole('row', { name: /Select row/i })
      const updateUserButton = getByRole(firstRow, 'menuitem', {
        name: /Users.Actions.UpdateUser/i,
      })
      expect(updateUserButton).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: /Users.Actions.SaveUser/i })
      ).not.toBeInTheDocument()

      await userEvent.click(updateUserButton)

      expect(
        screen.getByRole('button', { name: /Users.Actions.SaveUser/i })
      ).toBeInTheDocument()
    })
  })

  describe('CRUD', () => {
    // TODO:
    test('create user', () => {})

    // TODO:
    test('read user', () => {})

    // TODO:
    test('update user', () => {})

    // TODO:
    test('delete user', () => {})
  })
})
