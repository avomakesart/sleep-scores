import { Button } from '.';
import { render } from '@testing-library/react';

describe('components/button', () => {
  test('render the button component correctly', () => {
    const props = {
      onClick: () => console.log('hey i am a button'),
      children: 'Hello wold',
    };
    const rendered = render(<Button {...props} />);
    expect(rendered.baseElement).toBeInTheDocument();
  });

  test('render the button component as disabled', () => {
    const props = {
      onClick: () => console.log('hey i am a button'),
      children: 'Hello wold',
      isDisabled: true
    };
    const rendered = render(<Button {...props} />);
    expect(rendered.baseElement).toBeInTheDocument();
  });

  test('render the button component as loading state', () => {
    const props = {
      onClick: () => console.log('hey i am a button'),
      children: 'Hello wold',
      isLoading: true
    };
    const rendered = render(<Button {...props} />);
    expect(rendered.baseElement).toBeInTheDocument();
  });

  test('render the button component as loading state with a different loading label', () => {
    const props = {
      onClick: () => console.log('hey i am a button'),
      children: 'Hello wold',
      isLoading: true,
      loadingText: 'Getting there...'
    };
    const rendered = render(<Button {...props} />);
    expect(rendered.baseElement).toBeInTheDocument();
  });
});
