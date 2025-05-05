import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MegaMillionsSet from '../MegaMillionsSet';

// useToast 모킹
const mockToast = jest.fn();
jest.mock('@/common/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

jest.mock('lucide-react', () => ({
  Copy: () => <span data-testid="copy-icon" />,
}));

describe('MegaMillionsSet', () => {
  const mockClipboard = {
    writeText: jest.fn().mockResolvedValue(undefined),
  };
  Object.assign(navigator, { clipboard: mockClipboard });

  // console.error 모킹
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    mockClipboard.writeText.mockClear();
    mockToast.mockClear();
    (console.error as jest.Mock).mockClear();
  });

  it('renders all numbers correctly', () => {
    render(<MegaMillionsSet whiteNumbers={[1, 2, 3, 4, 5]} mega_ball={10} setNumber={1} />);

    [1, 2, 3, 4, 5].forEach(number => {
      expect(screen.getByText(number.toString())).toBeInTheDocument();
    });
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('shows correct set number', () => {
    render(<MegaMillionsSet whiteNumbers={[1, 2, 3, 4, 5]} mega_ball={10} setNumber={3} />);

    expect(screen.getByText('Set #3')).toBeInTheDocument();
  });

  it('copies numbers to clipboard when copy button is clicked', async () => {
    render(<MegaMillionsSet whiteNumbers={[1, 2, 3, 4, 5]} mega_ball={10} setNumber={1} />);

    const copyButton = screen.getByLabelText('Copy numbers');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalledWith('1 - 2 - 3 - 4 - 5 - 10');
      expect(mockToast).toHaveBeenCalledWith({
        description: 'Numbers copied to clipboard!',
      });
    });
  });

  it('shows error toast when clipboard copy fails', async () => {
    mockClipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

    render(<MegaMillionsSet whiteNumbers={[1, 2, 3, 4, 5]} mega_ball={10} setNumber={1} />);

    const copyButton = screen.getByLabelText('Copy numbers');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Clipboard error:', expect.any(Error));
      expect(mockToast).toHaveBeenCalledWith({
        description: 'Failed to copy numbers',
        variant: 'destructive',
      });
    });
  });

  it('separates white numbers and powerball with divider', () => {
    render(<MegaMillionsSet whiteNumbers={[1, 2, 3, 4, 5]} mega_ball={10} setNumber={1} />);

    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });
});
