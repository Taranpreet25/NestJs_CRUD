import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  
    TasksModule,
  
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'postgres',
      autoLoadEntities:true,
      synchronize:true,
  
    })
  
  ],
  
  // controllers: [TasksController],
  
  // providers: [TasksService], 
})

export class AppModule {}
