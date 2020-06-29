// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@exemple.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Dummy',
      email: 'john@dummy.com',
    });

    expect(updatedUser.name).toBe('John Dummy');
    expect(updatedUser.email).toBe('john@dummy.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@exemple.com',
      password: '123',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe wtf',
      email: 'jhonwtf@exemple.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Dummy',
        email: 'johndoe@dummy.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
