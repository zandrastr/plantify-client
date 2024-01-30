import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { UserContextProvider } from '../../contexts/userContext';
import { MemoryRouter } from 'react-router-dom';

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
    const myTitle = screen.getByText('Find a plant');
    expect(myTitle).toBeDefined();
  });
});
