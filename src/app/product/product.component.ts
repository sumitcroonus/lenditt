import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  productData:undefined|any;
  productId:any;
  constructor(private activatedRoute: ActivatedRoute, private api : ApiService){}

  ngOnInit(): void {
    this.productId=this.activatedRoute.snapshot.paramMap.get("id");
    // console.log(this.productId)
    this.api.getSingleProduct(this.productId)
    .subscribe({
      next:(res)=>{
        this.productData=res;
        // console.log(this.productData)
      },
      error:()=>{
        alert("Error while loading the details")
      }
    })
  }
}
