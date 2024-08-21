import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {
link:string='https://imgv3.fotor.com/images/share/fotor-ai-generate-a-lifelike-dragon.jpg'

colorControl =  new FormControl();

constructor(){
  this.colorControl.valueChanges.subscribe(value=>{
    console.log(value);
  })
}

keydownHandler(event:KeyboardEvent){
const input=event.target as HTMLInputElement;
console.log(input.value)
}



}
