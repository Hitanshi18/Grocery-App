import { Component, Input, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './shared/services/cart/cart.service';
import { RegisterService } from './shared/services/register/register.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  providers: [ { provide: TemplateRef, useValue: TemplateRef } ],
})
export class AppComponent {
  filterValue:any
  Registered_User:boolean=false
  Login_Logout_msg:string="Login"
  cartItemCount = 0;
  constructor(private _cartservice:CartService,private toastr:ToastrService,private _snackBar: MatSnackBar,private router:Router,private _RegisterService:RegisterService,private _cartService:CartService) {

    this._RegisterService.Login_Logout_msg.subscribe(res=>{
      this.Login_Logout_msg == res;
    })
  }
  RegisterData:any
  User:any
  LoginData:any
  cartMessage:any
  CountArr:any=[]
     ngOnInit(){ window.scrollTo(0,0)

      
    
   
    // cartcounter
    this._cartService.cartSubject.subscribe(cart => {
      this.cartItemCount = cart.length;
    });
    this._cartService.cartMsg.subscribe(cart => {
      this.cartMessage = cart
      console.log(this.cartMessage)
      this._snackBar.open(this.cartMessage+" Added Succesfully in Cart", "Ok");
    });

    // end cartcounter
    this.LoginData= JSON.parse(sessionStorage.getItem('Login_User'));
    this.RegisterData= JSON.parse(sessionStorage.getItem('Register_User'));
    this.User= JSON.parse(sessionStorage.getItem('User'));
    if(this.LoginData || this.User){
      this.Login_Logout_msg="Logout"
    }
   
  }
  cart:any=[]
  ngDoCheck(){
 
    
    this.LoginData= JSON.parse(sessionStorage.getItem('Login_User'));
    this.RegisterData= JSON.parse(sessionStorage.getItem('Register_User'));
    if(this.RegisterData){
      this.Registered_User=false
    }else{
      this.Registered_User=true
    }
    this.User= JSON.parse(sessionStorage.getItem('User'));
    if(this.LoginData || this.User){
      this.Login_Logout_msg="Logout"
    }
  
  }
  title = 'Grocery-App';
  login_logout:boolean |undefined;
 
  
   
    userData:any = sessionStorage.getItem('User');
    email:any = this.userData
  logout(){
    sessionStorage.removeItem('User');
    sessionStorage.removeItem('Login_User');
    sessionStorage.removeItem('Register_User')
    this.router.navigate(['front/user/registration'])

    this.Login_Logout_msg="Login"
  }


  
  Add_cart_count(){
  
    this.router.navigate(['/front/cart'])
  }
  
  
  };
  
  
  
