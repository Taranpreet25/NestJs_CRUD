import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.status.enum";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async createTask(createTaskDto:CreateTaskDto): Promise<Task>{

        const{ title, description } = createTaskDto;

            const task = this.create({
                title,
                description,
                status: TaskStatus.OPEN,
            });

        await this.save(task);
        return task;
    }


    /// need help
    async getTasks(filterDto : GetTaskFilterDto): Promise<Task[]>{

        const { status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        
        if(status){
            query.andWhere('task.status = :status', { status });

        }
        //see this
        // if(search){
        //     query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        // }
        if(search){
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` });
        }

        const tasks = await query.getMany();
        return tasks;
    } 

}
