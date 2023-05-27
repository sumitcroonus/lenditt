import { Component ,OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResult:any=[];

 constructor(private activatedRoute:ActivatedRoute, private api :ApiService){}

  ngOnInit(): void {
    let query=this.activatedRoute.snapshot.paramMap.get('query')
    //  console.log(query)
    query && this.api.searchProducts(query).subscribe((res)=>{
      this.searchResult=res.products;
      //  console.log(this.searchResult);
    })
  }
}
