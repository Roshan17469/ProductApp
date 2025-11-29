import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { userService } from '../api/userService'
import Table from '../components/Table/Table'
import Button from '../components/Button/Button'
import Modal from '../components/Modal/Modal'
import Input from '../components/Input/Input'
import Pagination from '../components/Pagination/Pagination'
import './UserList.css'

const ITEMS_PER_PAGE = 10

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'Active',
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await userService.getAllUsers()
      setUsers(response.data)
    } catch (error) {
      toast.error('Failed to fetch users: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        status: user.status,
      })
    } else {
      setEditingUser(null)
      setFormData({
        name: '',
        email: '',
        status: 'Active',
      })
    }
    setFormErrors({})
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
    setFormData({ name: '', email: '', status: 'Active' })
    setFormErrors({})
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format'
    }
    if (!formData.status.trim()) {
      errors.status = 'Status is required'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, formData)
        toast.success('User updated successfully!')
      } else {
        await userService.createUser(formData)
        toast.success('User created successfully!')
      }
      handleCloseModal()
      fetchUsers()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(`Failed to ${editingUser ? 'update' : 'create'} user: ${errorMessage}`)
      
      // Handle validation errors from backend
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors)
      }
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      await userService.deleteUser(id)
      toast.success('User deleted successfully!')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to delete user: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const getStatusBadge = (status) => {
    const statusClass = status === 'Active' ? 'status-active' : 'status-inactive'
    return <span className={`status-badge ${statusClass}`}>{status}</span>
  }

  // Pagination logic
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedUsers = users.slice(startIndex, endIndex)

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'status',
      header: 'Status',
      render: (value) => getStatusBadge(value),
    },
  ]

  const renderActions = (user) => (
    <div className="action-buttons">
      <Button
        variant="secondary"
        size="small"
        onClick={() => handleOpenModal(user)}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        size="small"
        onClick={() => handleDelete(user.id)}
      >
        Delete
      </Button>
    </div>
  )

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    )
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Users</h2>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          + Add User
        </Button>
      </div>

      <Table
        columns={columns}
        data={paginatedUsers}
        renderActions={renderActions}
      />

      {users.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={users.length}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? 'Edit User' : 'Create User'}
        size="medium"
      >
        <form onSubmit={handleSubmit} className="user-form">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            error={formErrors.name}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            error={formErrors.email}
            required
          />

          <div className="input-group">
            <label htmlFor="status" className="input-label">
              Status <span className="required">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={`input-field ${formErrors.status ? 'input-error' : ''}`}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            {formErrors.status && (
              <span className="input-error-message">{formErrors.status}</span>
            )}
          </div>

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingUser ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default UserList

