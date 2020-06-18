// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserervice from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserervice(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User with a repeated email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserervice(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: '123',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@exemple.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
