import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meeting } from './models/meeting.model';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(@InjectModel(Meeting) private model: typeof Meeting) {}

  create(dto: CreateMeetingDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.findAll();
  }

  async findOne(id: number) {
    const meeting = await this.model.findByPk(id);
    if (!meeting) throw new NotFoundException('Meeting topilmadi');
    return meeting;
  }

  async update(id: number, dto: UpdateMeetingDto) {
    const meeting = await this.findOne(id);
    return meeting.update(dto);
  }

  async remove(id: number) {
    const meeting = await this.findOne(id);
    await meeting.destroy();
  }
}
