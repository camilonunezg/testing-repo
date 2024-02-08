import { faker } from '@faker-js/faker';

export const delayPromise = <T>(value: T): Promise<T> => {
  return new Promise((resolve) =>
    setTimeout(resolve, faker.number.int({ min: 200, max: 1000 }), value)
  );
};
