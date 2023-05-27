import { Component,OnInit,Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  
})
export class DialogComponent implements OnInit{
  
  actionBtn:string ="Add";
  allCategories:any=[];
  productForm !: FormGroup;

  constructor(private formBuilder:FormBuilder, 
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>){

  }

  ngOnInit(): void {
  this.productForm=this.formBuilder.group({
    title:['',Validators.required],
    description:['',Validators.required],
    price:['',Validators.required],
    discountPercentage:['',Validators.required],
    brand:['',Validators.required],
    category:['',Validators.required],
    thumbnail:['',Validators.required],
  })
  if(this.editData){
    this.actionBtn="Edit";
    this.productForm.controls['title'].setValue(this.editData.title)
    this.productForm.controls['description'].setValue(this.editData.description)
    this.productForm.controls['price'].setValue(this.editData.price)
    this.productForm.controls['discountPercentage'].setValue(this.editData.discountPercentage)
    this.productForm.controls['brand'].setValue(this.editData.brand)
    this.productForm.controls['category'].setValue(this.editData.category)
    this.productForm.controls['thumbnail'].setValue(this.editData.thumbnail)
  }
  this.getAllCategories();
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        console.log(this.productForm.value)
        this.api.postProduct(JSON.stringify(this.productForm.value.json))
        .subscribe({
          next:(res)=>{
          alert("Product added !")
          this.productForm.reset();
          this.dialogRef.close('save');
          },
          error:()=>{
           alert("Error while adding the product !") 
          }
        })
      }
    }
    else{
      this.updateProduct()
    }
  }

  updateProduct(){
    this.api.update(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated successfully!");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating!")
      }
    })
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
