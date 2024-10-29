import AddAccountButton from '@/app/(dashboard)/(home)/accounts/add-account-button'
import { render, screen, userEvent } from '@/test/test-utils'
import getRole from '@/utils/get-role'
import '@testing-library/jest-dom'

// Mock the getRole function
jest.mock('@/utils/get-role', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('Add Account Button with role rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show the add account button for admin role', async () => {
    ;(getRole as jest.Mock).mockResolvedValue('admin') // Mock role as admin

    render(<AddAccountButton />)

    // Use findByRole to wait for the button to appear
    const button = await screen.findByRole('button', { name: /add/i })
    expect(button).toBeInTheDocument()
  })

  it('should show the add account button for marketing role', async () => {
    ;(getRole as jest.Mock).mockResolvedValue('marketing') // Mock role as marketing

    render(<AddAccountButton />)

    // Use findByRole to wait for the button to appear
    const button = await screen.findByRole('button', { name: /add/i })
    expect(button).toBeInTheDocument()
  })

  it('should show the add account button for finance role', async () => {
    ;(getRole as jest.Mock).mockResolvedValue('finance') // Mock role as finance

    render(<AddAccountButton />)

    const button = await screen.findByRole('button', { name: /add/i })
    expect(button).toBeInTheDocument()
  })

  it('should show the add account button for under-writing role', async () => {
    ;(getRole as jest.Mock).mockResolvedValue('under-writing') // Mock role as under-writing

    render(<AddAccountButton />)

    const button = await screen.findByRole('button', { name: /add/i })
    expect(button).toBeInTheDocument()
  })

  it('should show the add account button for after-sales role', async () => {
    ;(getRole as jest.Mock).mockResolvedValue('after-sales') // Mock role as after-sales

    render(<AddAccountButton />)

    const button = await screen.findByRole('button', { name: /add/i })
    expect(button).toBeInTheDocument()
  })

  it('should not show the add account button for agent role', async () => {
    ;(getRole as jest.Mock).mockResolvedValue('agent') // Mock role as agent

    render(<AddAccountButton />)

    // Use findByRole to wait for the button to appear
    const button = await screen.findByRole('button', { name: /add/i })
    expect(button).not.toBeInTheDocument()
  })
})

describe('Add account Modal Form', () => {
  it.skip('should open a modal when the button is clicked', async () => {
    render(<AddAccountButton />)
    const button = screen.getByRole('button', { name: /add/i })
    await userEvent.click(button)
    expect(screen.getByText(/add account/i)).toBeInTheDocument()
  })
})
