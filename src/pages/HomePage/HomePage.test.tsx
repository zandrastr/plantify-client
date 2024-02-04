import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'vitest';
import HomePage from './HomePage';
import { UserContextProvider } from '../../contexts/userContext';

const contextWrapper = ({ children }: { children: React.ReactNode }) => <UserContextProvider>{children}</UserContextProvider>;

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
      { wrapper: contextWrapper }
    );
  });

  it('renders the HomePage component', () => {
    const appName = screen.getByText('Plantify');
    expect(appName).toBeDefined();
  });

  it('should add text to input field', () => {
    const input = screen.getByLabelText('Plant name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Rose' } });
    expect(input.value).toEqual('Rose');
  });

  it('should show loading spinner when submitting search', async () => {
    const input = screen.getByLabelText('Plant name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Rose' } });
    const button = screen.getByText('Search');
    await act(() => {
      fireEvent.click(button);
    });
    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeDefined();
  });

  it('should display error message when input value is empty', async () => {
    const input = screen.getByLabelText('Plant name') as HTMLInputElement;
    const button = screen.getByText('Search');
    fireEvent.change(input, { target: { value: '' } });
    await act(() => {
      fireEvent.click(button);
    });
    const errorMessage = screen.getByText('Plant name is required');
    expect(errorMessage).toBeInTheDocument();
  });
});
