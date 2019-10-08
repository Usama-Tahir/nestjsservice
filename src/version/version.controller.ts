import {Controller, Post, Body, Param, Get, Delete} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {WidgetService, WidgetDto, Widget, GetWidgets} from '../widget';
import {VersionService} from './version.service';

@ApiUseTags('Version')
@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  // Create widget
  @Post('version/:versionId/widget')
  createWidget(@Body() widget: WidgetDto, @Param('versionId') versionId: string): Promise<Widget> {
    return this.versionService.createWidget(
      widget,
      versionId);
  }

  // Get widget
  @Get('version/:versionId/widget/:widgetId')
  getWidget(@Param('versionId') versionId: string, @Param('widgetId') widgetId: string): Promise<Widget> {
    return this.versionService.getWidgetById(
      versionId,
      widgetId);
  }

  // Delete widget
  @Delete('version/:versionId/widget/:widgetId')
  deleteWidget(@Param('versionId') versionId: string, @Param('widgetId') widgetId: string) {
    return this.versionService.deleteWidget(
      versionId,
      widgetId);
  }

  // Get widget list
  @Get('version/:versionId/widgets')
  getWidgetList(@Param('versionId') versionId: string): Promise<GetWidgets> {
    return this.versionService.getWidgetList(versionId);
  }
}
