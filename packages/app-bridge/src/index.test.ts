import { vi } from 'vitest';

const mockLogger = {
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
};
vi.mock('./utils', () => ({
  logger: mockLogger,
}));

describe('headless mode', () => {
  it('window is defined', () => {
    // then
    expect(window).toBeDefined();
    expect(window).toHaveProperty('location');
    expect(window).toHaveProperty('alert');
    expect(window.location).toHaveProperty('search');
  });
});
