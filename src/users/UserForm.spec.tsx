import { render, screen, waitFor } from '@testing-library/react'
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from 'react-router-dom'
import UserProvider from './UserContext.tsx'
import UserForm from './UserForm'
import userEvent from '@testing-library/user-event'

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

describe('UserForm', () => {
  beforeEach(() => {
    fetchMock.mockResponse(JSON.stringify(testUsers))
  })

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

      await waitFor(() => {
        render(
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        )
      })

      const inputs = screen.getAllByRole('textbox')
      for (const input of inputs) {
        expect(input).toHaveValue('')
      }
    })

    test.each(testUsers)(
      'loads user with correct values - $id',
      async ({ id, ...formValues }) => {
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

        await waitFor(() => {
          render(
            <UserProvider>
              <RouterProvider router={router} />
            </UserProvider>
          )
        })

        await waitFor(() => {}) // fetch users in UserContext
        await waitFor(() => {}) // populate form

        const formFields = ['usersame', 'firstName', 'lastName', 'email']

        const form = screen.getByRole('form')
        expect(form).toHaveFormValues(
          Object.fromEntries(
            Object.entries(formValues).filter(([key]) =>
              formFields.includes(key)
            )
          )
        )
      }
    )
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
