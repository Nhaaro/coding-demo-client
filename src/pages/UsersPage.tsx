import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Button,
  IconButton,
  Link as MuiLink,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
  GridRowsProp,
} from '@mui/x-data-grid'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const UsersPage = () => {
  const { t } = useTranslation()

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('Users.Table.Headers.ID') },
    {
      field: 'username',
      headerName: t('Users.Table.Headers.Username'),
      minWidth: 180,
      renderCell(params) {
        return (
          <MuiLink
            component={Link}
            to={`/users/${params.id}`}
            underline="hover"
          >
            {params.value}
          </MuiLink>
        )
      },
    },
    {
      field: 'name',
      headerName: t('Users.Table.Headers.DisplayName'),
      valueGetter: (_, row) => {
        return `${row.firstName || ''} ${row.lastName || ''}`
      },
      minWidth: 250,
    },
    {
      field: 'email',
      headerName: t('Users.Table.Headers.Email'),
      minWidth: 150,
    },
    {
      field: 'active',
      headerName: t('Users.Table.Headers.Status'),
      type: 'boolean',
    },
    {
      field: 'createdAt',
      headerName: t('Users.Table.Headers.CreatedAt'),
      type: 'dateTime',
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('Users.Table.Headers.Actions'),
      getActions: (params: GridRowParams) => [
        <Tooltip title={t('Users.Actions.EditUser')}>
          <IconButton
            aria-label="edit"
            component={Link}
            to={`/users/${params.id}/edit`}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>,
        <Tooltip title={t('Users.Actions.DeleteUser')}>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label={t('Users.Actions.DeleteUser')}
          />
        </Tooltip>,
      ],
    },
  ]
  const rows: GridRowsProp = [
    {
      id: 1,
      username: 'username',
      active: true,
      firstName: 'User',
      lastName: 'Name',
      email: 'mail@mail.com',
      createdAt: new Date(Date.now()),
    },
    {
      id: 12,
      username: 'username',
      active: true,
      firstName: 'User',
      lastName: 'Name',
      email: 'mail@mail.com',
      createdAt: new Date(Date.now()),
    },
  ]

  const [rowSelectionModel, setRowsSelectectionModel] =
    React.useState<GridRowSelectionModel>([])

  return (
    <>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'BlogScript',
              fontWeight: 700,
              lineHeight: '2rem', // prevent letters being cropped
            }}
            color="secondary"
          >
            {t('Navigation.Tabs.Users')}
          </Typography>
        </Box>
        <Stack spacing={2} direction="row" sx={{ flexGrow: 0 }}>
          <Button variant="outlined" disabled={!rowSelectionModel.length}>
            {t('Users.Actions.DeleteUserBulk')}
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/users/create"
            endIcon={<AddIcon />}
          >
            {t('Users.Actions.CreateUser')}
          </Button>
        </Stack>
      </Toolbar>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        onRowSelectionModelChange={(rowSelectionModel) => {
          setRowsSelectectionModel(rowSelectionModel)
        }}
      />
    </>
  )
}

export default UsersPage
