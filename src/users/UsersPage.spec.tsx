import { expect, test } from '@jest/globals'
import { getByRole, render, screen } from '@testing-library/react'
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

describe('UsersPage', () => {
  describe('presentation', () => {
    test('it renders', () => {
      render(
        <UserProvider>
          <MemoryRouter>
            <UsersPage />
          </MemoryRouter>
        </UserProvider>
      )
    })

    test('bulk delete is disabled by default', async () => {
      render(
        <UserProvider>
          <MemoryRouter>
            <UsersPage />
          </MemoryRouter>
        </UserProvider>
      )

      const deleteUsersButton = screen.getByRole('button', {
        name: /Users.Actions.DeleteUserBulk/i,
      })

      expect(deleteUsersButton).toBeDisabled()
    })

    test('table starts with correct data', async () => {
      render(
        <UserProvider>
          <MemoryRouter>
            <UsersPage />
          </MemoryRouter>
        </UserProvider>
      )

      const rows = screen.getAllByRole('row', { name: /Select row/i })

      expect(rows).toMatchSnapshot()
    })

    test('bulk delete button activates on row selection', async () => {
      render(
        <UserProvider>
          <MemoryRouter>
            <UsersPage />
          </MemoryRouter>
        </UserProvider>
      )

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

      render(
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      )

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
