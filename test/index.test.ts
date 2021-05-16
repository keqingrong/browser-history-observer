import { isHashEqual } from '../src';

test('isHashEqual', () => {
  expect(
    isHashEqual(`http://localhost:3000/#/home`, `http://localhost:3000/#/home`)
  ).toBeTruthy();
});
