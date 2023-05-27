import { Component,OnInit } from '@angular/core';
import {MatDialog, } from '@angular/material/dialog'
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'lntpl';
  selected:any="smartphones";
  allCategories:any=[];


  
  constructor(private dialog:MatDialog, private api:ApiService){}
  
  ngOnInit(): void {

  }
  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'30%'
    });
  }
  getAllCategories(){
    this.api.categories()
    .subscribe({
      next:(res)=>{
        this.allCategories=res;
      },
      error:()=>{
        alert("error")
      }
    })
  }
 
}

