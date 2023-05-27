import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  postProduct(data:any){
    return this.http.post<any>('https://dummyjson.com/products/',data);
  }
  getProduct(){
    return this.http.get<any>('https://dummyjson.com/products/');
  }
  delete(id:any){
    return this.http.delete<any>('https://dummyjson.com/products/'+id);
  }
  update(data:any,id:any){
    return this.http.put<any>('https://dummyjson.com/products/'+id,data);
  }
  categories(){
    return this.http.get<any>('https://dummyjson.com/products/categories');
  }
  getSingleProduct(id:any){
    return this.http.get<any>('https://dummyjson.com/products/'+id);
  }
  searchProducts(query:any){
    return this.http.get<any>('https://dummyjson.com/products/search?q='+query);
  }
}
