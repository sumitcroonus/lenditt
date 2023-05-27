import { Component ,OnInit} from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component';
import {Router} from '@angular/router'
import { map } from 'rxjs/operators'



@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  constructor(private dialog:MatDialog,
    private api : ApiService,
    private router : Router,
    ){}
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    // console.log(this.allCategories)
  }
  
  dataSource!:MatTableDataSource<any>;
  allProducts:any=[];
  searchResult:any=[];
  allCategories:any=[];
  selected:any="All products";
  selectedarry:any=[];

   openDialog() {
    this.dialog.open(DialogComponent,{
      width:'30%'
    });
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        this.allProducts=res.products;
         this.selectedarry=res.products;
        //  console.log(this.selectedarry);
        
        //  this.dataSource = new MatTableDataSource(this.allProducts);


        //  for (const item of this.allProducts){
        //   console.log(item + ":" +JSON.stringify(this.allProducts))
        //  }
        //  console.log(this.allProducts);
        // console.log(typeof this.allProducts[1])
      },
      error:()=>{
        alert("error while fetching records!")
      }
    })
  }
  deleteProduct(id:any){
    // console.log(id)
    this.api.delete(id)
    .subscribe({
      next:(res)=>{
        alert("Product deleted successfully!")
      },
      error:()=>{
        alert("error while deleting product!")
      }
    })
    this.getAllProducts();
  }
  // detail(id:any){
  //   this.router.navigateByUrl(`details/${id}`);
  // }
  edit(product:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:product,
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
  onCategorySelected(option:any) {
    // this.selected=option;
      // console.log(option);
      this.selectedarry=[]
      // console.log(this.selectedarry)
    
 if(this.selected=="All products"){
 this.selectedarry=this.allProducts;
}
else if(this.selected!="All products"){
  this.api.getProduct().subscribe({
    next:(res)=>{
        this.selectedarry=res.products.filter((obj:any)=>{
        if(obj.category==option){
          return obj;
        }
       })
}

})
}
    
  }
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      // console.log(element.value)
      this.api.searchProducts(element.value)
      .subscribe((res)=>{
        // console.log(res)
        this.searchResult=res;
      })
    }
  }
  submitSearch(val:any){
    // console.log(val);
    this.router.navigate(['search/'+val])
  }
  
}

