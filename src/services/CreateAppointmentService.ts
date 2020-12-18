import { startOfHour } from 'date-fns';
import Appointment from 'models/Appointment';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const thereIsAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (thereIsAppointmentInSameDate)
      throw Error('This appointment is already booked');

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
