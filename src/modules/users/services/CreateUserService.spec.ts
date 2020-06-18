// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User with a repeated email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
