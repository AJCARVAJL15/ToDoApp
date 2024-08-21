import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Task } from '../../models/task..model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReturnStatement } from '@angular/compiler';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  tasks =signal<Task[]>([

  
  ]);
  injector=inject(Injector);
  state: string=''
  filter=signal('all');
  tasksByFilter= computed(()=>{
    const filter=this.filter()
    const tasks=this.tasks()

    if(filter==='Pending'){
      return tasks.filter(task=> !task.completed);
    }

    if(filter==='Completed'){
      return tasks.filter(task=> task.completed);
    }

    return tasks;

  })
    
  

  newTaskControl= new FormControl('',{
    nonNullable:true,
    validators:[Validators.required]
  })


  ngOnInit(){
    const storage=localStorage.getItem('tasks');
    if(storage){
      const tasks=JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTask();
  }

  trackTask(){
    effect(()=>{
      const task=this.tasks();
      console.log("run effect")
      localStorage.setItem('tasks',JSON.stringify(task));    
    },{injector:this.injector});
  }
 
  

  



  getValueInput(){
   
    if(this.newTaskControl.valid){
      const value=this.newTaskControl.value.trim();
      if(value!= ''){
        this.addTask(value);
        this.newTaskControl.setValue('')
      }
      
    }

   

  }

 

  deleteTask(index:number){
      this.tasks.update((tasks)=>tasks.filter((task,position)=>position!==index))
      console.log(this.tasks())
  }

  addTask(title:string){
    const newTask={
      id:Date.now(),
      title,
      completed:false,
    };

    this.tasks.update((tasks)=>[...tasks,newTask]);

  }



  getValueToggle(event:Event, index:number){
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    console.log(isChecked)

    console.log(index)

    
      this.tasks.update((tasks) =>
        tasks.map((task, i) =>
          i === index ? { ...task, completed: isChecked } : task
        )
      );



     

      console.log(this.tasks())




  }

  editTaskMode(index:number){
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index ? { ...task, edit:true  } : task
      )
    );

    console.log(this.tasks())

  }

  editTask(index:number, event:Event){
    const input=event.target  as HTMLInputElement;

    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index ? { ...task,title:input.value, edit:false  } : task
      )
    );

    console.log(this.tasks())

    


  }

  changeFilter(filter:string){
    this.filter.set(filter)
    console.log(this.filter())
  }

  deleteTaskCompleted(){
    this.tasks.update((tasks)=>tasks.filter((task)=>!task.completed))
    console.log(this.tasks())
  }


}
