import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
// import { filter } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { TasksService } from './tasks.service';
import { updateTaskStatus } from './update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

@Get('/:id')
getTaskById(@Param('id') id:string ) : Promise<Task>{
  return this.taskService.getTaskById(id);
}






}