import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Simple working test', () => {
  test('the title is visible', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Vite + React')).toBeInTheDocument()
    })
  })

  test('should increment count on click', async () => {
    render(<App />)
    const counter = screen.getByRole('button', { name: /count is/i })
    expect(counter).toHaveTextContent('count is 0')
    await userEvent.click(counter)
    expect(counter).toHaveTextContent('count is 1')
  })
})
