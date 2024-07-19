import { render, screen } from '@testing-library/react'
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from 'react-router-dom'
import UserProvider from './UserContext.tsx'
import UserForm from './UserForm'
import userEvent from '@testing-library/user-event'

describe('UserForm', () => {
  describe('initial data', () => {
    test('loads create user with empty values', async () => {
      let router = createMemoryRouter(
        [
          {
            path: 'users/create',
            element: <UserForm />,
          },
          {
            path: 'users/:userId/edit',
            element: <UserForm />,
          },
        ],
        {
          initialEntries: ['/users/create'],
        }
      )

      render(
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      )

      const inputs = screen.getAllByRole('textbox')
      for (const input of inputs) {
        expect(input).toHaveValue('')
      }
    })

    test.each([
      {
        id: 1,
        username: 'username',
        firstName: 'User',
        lastName: 'Name',
        email: 'mail@mail.com',
      },
      {
        id: 12,
        username: 'otheruser',
        firstName: 'Another',
        lastName: 'User',
        email: 'other@mail.com',
      },
    ])('loads user with correct values', async ({ id, ...formValues }) => {
      let router = createMemoryRouter(
        [
          {
            path: 'users/create',
            element: <UserForm />,
          },
          {
            path: 'users/:userId/edit',
            element: <UserForm />,
          },
        ],
        {
          initialEntries: [`/users/${id}/edit`],
        }
      )

      render(
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      )

      const form = screen.getByRole('form')
      expect(form).toHaveFormValues(formValues)
      expect(screen.getByLabelText('Users.Attributes.Password')).toHaveValue('')
    })
  })

  test('inputs can be modified', async () => {
    render(
      <UserProvider>
        <MemoryRouter>
          <UserForm />
        </MemoryRouter>
      </UserProvider>
    )

    const inputs = screen.getAllByRole('textbox')
    for (const input of inputs) {
      const text = input.attributes.getNamedItem('name')?.value || ''
      expect(input).toHaveValue('')
      await userEvent.type(input, text)
      expect(input).toHaveValue(text)
    }
  })
})
