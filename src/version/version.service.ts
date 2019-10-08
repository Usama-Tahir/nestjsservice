import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Widget, WidgetDto, GetWidgets, WidgetService} from '../widget';
import {Version} from '.';
import {VersionDto} from './version.dto';

@Injectable()
export class VersionService {
  constructor(
    @InjectModel('Version') private versionModel: Model<Version>,
    private readonly widgetService: WidgetService
  ) {}

  async createVersion(versionDto: VersionDto): Promise<Version> {
    const version = new this.versionModel(versionDto);
    version.Active = false;
    version.General.Status = 'Not Live';
    return await version.save();
  }

  async findVersionById(id: string): Promise<Version> {
    return await this.versionModel.findById(id).select(['-__v']).lean().exec();
  }

  async deleteVersionById(id: string) {
    return this.versionModel.findByIdAndDelete(id);
  }

  async createWidget(widgetToSave: WidgetDto, versionId: string): Promise<Widget> {
    let widgetSaved = await this.widgetService.createWidget(widgetToSave);

    await this.versionModel.findByIdAndUpdate(
      versionId, {
      $push: {
        Widgets: widgetSaved.id,
      },
    });

    return widgetSaved;
  }

  async deleteWidget(versionId: string, widgetId: string) {
    await this.versionModel.findByIdAndUpdate(versionId, {
      $pull: {Widgets: widgetId},
    });

    return await this.widgetService.deleteWidgetById(widgetId);
  }

  async getWidgetById(versionId: string, widgetId: string): Promise<Widget> {
    return await this.widgetService.getWidgetById(widgetId);
  }

  async getWidgetList(versionId: string): Promise<GetWidgets> {
    const res = await this.versionModel.findById(versionId).select([
      'Widgets',
    ]).lean().exec();

    return {widgets: res.Widgets} as GetWidgets;
  }
}
