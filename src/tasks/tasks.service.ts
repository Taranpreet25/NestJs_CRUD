import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private tasksReository:TaskRepository,
        ){}

    async getTaskById(id:string): Promise<Task>{
        const found = await this.tasksReository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }    
    
}
  