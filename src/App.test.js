import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByTestId } = render(<App />);
  const app = getByTestId("app");
  expect(app).toBeTruthy();
});
