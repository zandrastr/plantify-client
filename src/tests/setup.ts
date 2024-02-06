import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// runs a clean after each test case
afterEach(() => {
  cleanup();
})

// sets up mocked chakra functions in use
vi.mock('@chakra-ui/react', async () => {
  const module = (await vi.importActual('@chakra-ui/react')) as object;

  return {
    ...module,
    useBreakpoint: vi.fn(),
    useBreakpointValue: vi.fn(),
  };
});
