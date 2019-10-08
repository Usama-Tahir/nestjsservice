import {Controller} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('Widget')
@Controller('widget')
export class WidgetController {}
