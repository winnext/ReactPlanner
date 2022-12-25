import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiTags } from '@nestjs/swagger';
import { NoCache } from 'ifmcommon/dist';

@Controller('todo')
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(":planKey")
  @NoCache()
  getOne(@Param("planKey") planKey:string) {
    return this.todoService.getOne(planKey);
  }


  @Post("check")
  check (@Body() createTodoDto: CreateTodoDto,@Headers() header:any){
    return this.todoService.check(createTodoDto,header);
  }
}
