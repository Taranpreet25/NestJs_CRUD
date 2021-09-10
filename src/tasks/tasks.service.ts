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
        private tasksRepository:TaskRepository,
        ){}

    async getTaskById(id:string): Promise<Task>{
        const found = await this.tasksRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }   
    
   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const{ title, description } = createTaskDto;

        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.tasksRepository.save(task);
        return task;

        

   }
    
}
  