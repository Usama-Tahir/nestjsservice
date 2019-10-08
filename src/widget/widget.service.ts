import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Version} from '../version';
import {Widget, WidgetDto, GetWidgets} from '.';

@Injectable()
export class WidgetService {
  constructor(
    @InjectModel('Widget') private widgetModel: Model<Widget>,
  ) {}

  async createWidget(widgetDto: WidgetDto): Promise<Widget> {
    const widget = new this.widgetModel(widgetDto);
    return await widget.save();
  }

  async deleteWidgetById(id: string) {
    return await this.widgetModel.findByIdAndDelete(id);
  }

  async getWidgetById(id: string): Promise<Widget> {
    return await this.widgetModel.findById(id).lean().exec();
  }
}
