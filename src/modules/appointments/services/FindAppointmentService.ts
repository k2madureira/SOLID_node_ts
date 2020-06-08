/* import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class FindAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.list;

    if (!appointments) {
      throw new AppError('No Appointmets in book!', 400);
    }

    return appointments;
  }
}

export default FindAppointmentService; */
