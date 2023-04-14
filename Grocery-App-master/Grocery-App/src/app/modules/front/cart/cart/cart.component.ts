import { group } from '@angular/animations';
import { Component ,TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { PromptService } from 'src/app/shared/services/prompt/prompt.service';
 import { NgxSpinnerService } from 'ngx-spinner';
import { NgIfContext } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],

 providers:[ { provide: TemplateRef, useValue: TemplateRef } ],
})

export class CartComponent {
  [x: string]: any;
  cartItems:any[]=[]
  loading:boolean=true
  // EmptyCart: boolean;
  showContent = true;

  
  constructor(private noContentTemplate: TemplateRef<NgIfContext<any>>,private spinner: NgxSpinnerService,private _productservice:ProductsService,private _cartservice:CartService,private route:Router,private toastr:ToastrService,private router:Router,private _promptService:PromptService){
    // router.events.subscribe((res:any)=>{
    //   if(res.url){
    //     this.groupedProducts
    //     console.log("groupedproducts",this.groupedProducts)
    //   }
    // })
    this.Guest_Cart=JSON.parse(sessionStorage.getItem("Guest_Cart"))
  }
  cart:any=[]
  // cartItems;
  price:any
  cartObj:any
  
  filteredItems:any=[]
  groupedProducts: any[] = [];
  cartlength:any
  cartEmptyShow=true
  data:any
  dateFormat:any
  Customer_Id:number
User_Details:any
Guest_Cart:any=[]
username:string
Login_User:any
    ngOnInit(){ 
      window.scrollTo(0,0)
      this.Login_User=JSON.parse(sessionStorage.getItem("Login_User"))
      this.Guest_Cart=JSON.parse(sessionStorage.getItem("Guest_Cart"))
      console.log("Guesut Cart",this.Guest_Cart)
    this.User_Details=JSON.parse(sessionStorage.getItem('User_Details'))
    if(this.User_Details){

      this.username=this.User_Details.username
      this.Customer_Id=this.User_Details.id
      console.log("Customer_Id",this.Customer_Id)
    }
    // this.Date()
// console.log("dateFormat",JSON.stringify(this.dateFormat));
    this.filteredItems=this._productservice.getProducts()
  
    this['spinner'].show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      /** spinner ends after 5 seconds */
      this['spinner'].hide();
    }, 1500);
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    if(Merge && this.User_Details){

      this.Find_Customer_Cart=Merge.find((user:any)=>user.username==this.User_Details.username)
      if(this.Find_Customer_Cart){
        this.Customer_Cart=this.Find_Customer_Cart.items
        console.log("Find_Customer_Cart",this.Find_Customer_Cart)
        console.log("Customer_Cart",this.Customer_Cart)
        // this.Check_Guest_User()
        
        this.Category_wise_Filter(this.Customer_Cart)
      }
    }
    else{
        console.log("this.Guest_Cart[0].items",this.Guest_Cart[0].items)
        this.Category_wise_Filter(this.Guest_Cart[0].items)
        // this.Check_Guest_User()
            }
  }
  // Guest_User:boolean=false
  // Check_Guest_User(){
  //   if(!this.Guest_Cart[0].items.length || !this.Customer_Cart.length){
  //     this.Guest_User=true
  //   }
  // }
  Date(Add_number:any){
    let today_date = new Date()
    today_date.toLocaleDateString()
    let Deliver_date=new Date()

//     var getYear = date.toLocaleString("default", { year: "numeric" });
//     var getMonth = date.toLocaleString("default", { month: "2-digit" });
// var getDay = date.toLocaleString("default", { day: "2-digit" });
//     this.dateFormat = getYear + "-" + getMonth + "-" + getDay;
    if(Add_number){
      Deliver_date.setDate(today_date.getDate()+Add_number)
      return Deliver_date
    }else{
      return today_date
    }
  }
  Category_wise_Filter(Arr:any){
    this.groupedProducts = Arr.reduce((acc, product) => {
          
      const existingCategory = acc.find(group => group.category === product.category);
      if (existingCategory) {
        existingCategory.cart.push(product);
        // this.groupedProducts=this.cartlength
      } else {
        acc.push({ category: product.category, cart: [product] });
      }
      return acc;
  }, []);
  console.log(this.groupedProducts,"groupedProducts")
  console.log("cart",this.cart)
  }
  Find_Customer_Cart:any
  Customer_Cart:any=[]
  ngAfterViewInit(){
    this.CartEmptyShow_Data()
   
    // console.log("Subtotal From Cart",this.Subtotal())
   }
  //Badge
  
  // update the cart badge count
  
  
  Customer_Index:number
  quantity=1
  Obj:any
  Subtotal_Per_Prod:any
  quantitymin(index:any,productindex:any,product:any){
    let Guest = JSON.parse(sessionStorage.getItem('Guest_Cart'));
    console.log("Guest",Guest)
    if(this.groupedProducts[index].cart[productindex].quantity>1){
      if(Guest){
        if(Guest[0].items.length){
          Guest[0].items[0].quantity-=1
          this.groupedProducts[index].cart[productindex].quantity=Guest[0].items[0].quantity
          console.log("Guest_Cart",Guest)
          sessionStorage.setItem("Guest_Cart",JSON.stringify(Guest))
        }
      }else{
        this._cartservice.Quantity_Minus(this.User_Details.username,product)
        this.groupedProducts[index].cart[productindex].quantity-=1    
      }     
  }
  }
  quantitymax(index:any,productindex:any,product:any){
    let Guest = JSON.parse(sessionStorage.getItem('Guest_Cart'));
    if(Guest){
      if(Guest[0].items.length){
        Guest[0].items[0].quantity+=1
        this.groupedProducts[index].cart[productindex].quantity= Guest[0].items[0].quantity
        console.log("Guest_Cart",Guest)
        this.Guest_Cart=sessionStorage.setItem("Guest_Cart",JSON.stringify(Guest))
      }
    } else{
    this._cartservice.Quantity_Plus(this.User_Details.username,product)
      this.groupedProducts[index].cart[productindex].quantity+=1  
  }
}
  
  GST:any
  Total:any
  
  Subtotal():number {
    let subtotal:any = 0;
  // console.log("GroupProducts In Subtotal",this.groupedProducts)
    if(this.groupedProducts.length){
  
      for (let i = 0; i < this.groupedProducts.length; i++) {
        for(let j=0;j<this.groupedProducts[i].cart.length;j++){
          // console.log("Cart in Subtottal",this.cart[i])
          // subtotal += this.groupedProducts[i].cart[j].amount;
          subtotal += this.groupedProducts[i].cart[j].quantity * this.groupedProducts[i].cart[j].amount;
        }
    }
    this.GST=subtotal*0.18;
    this.Total=subtotal+this.GST
    // console.log("Subtotal Function =" ,subtotal)
    this._cartservice.updateSubtotal(subtotal);
    return subtotal;
  }else{
    subtotal=0
    return subtotal;
  }
    
  }
  
  // for Subtotal
  
  
  Subtotal_Per_Category(group) {
    let total = 0;
  let subtotal=0;
      // console.log("group",group.cart)
      for (let i=0;i<group.cart.length;i++) {
        let itemTotal = group.cart[i].amount * group.cart[i].quantity
        // console.log("group.cart[i].amount * group.cart[i].quantity",group.cart[i].amount * group.cart[i].quantity)
        subtotal += itemTotal;
      }
      // console.log(`Subtotal for ${cart.category}: ${subtotal} ${cart.cart[0].moneyOfferPrice}`);
      return total += subtotal;
      // console.log(`Total: ${total} ${cart[0].cart[0].money}`);
    }
  CartEmptyShow_Data(){
    if(!this.cart.length){
      this.cartEmptyShow=false
      console.log("cartEmptyShow",this.cartEmptyShow)
    }else{
              this.cartEmptyShow=true
              console.log("cartEmptyShow",this.cartEmptyShow)
            }
  }
  cartItemCount:any
  clickedItem:any=[]


  DelectProduct(id:any,index:any,productindex:any,product:any){
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are you sure?');
    confirmBox.setMessage('Do you want to Delete '+product.title+' ?');
    confirmBox.setButtonLabels('DELETE', 'NO');

    // Choose layout color type
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    // Simply open the popup and listen which button is clicked
    confirmBox.openConfirmBox$().subscribe((resp:any) => {
      // IConfirmBoxPublicResponse
      console.log('Clicked button response: ', resp);

      if(resp.success){
        
        if(this.username){
          
          // this.Check_Guest_User()
          this._cartservice.Delete_Cart_LocalStorage(this.User_Details.username,product)
          this.groupedProducts[index].cart.splice(productindex,1)
        this._cartservice.getItemCount()
        this._cartservice.Subtotal()

      }else{
        this._cartservice.Delete_Guest_cart()
        this.groupedProducts[index].cart.splice(productindex,1)
        this._cartservice.Subtotal()
        // this.Check_Guest_User()
        this._cartservice.getItemCount()
        
      }
    
  }
    });
    }
    product:any
    ProductArr=[]
    get_cart_data(){
    for(let i=0;i<this.Find_Customer_Cart.items.length;i++){
      console.log("Cart Length",this.Find_Customer_Cart.items.length)
      //  console.log("this.cart.length")
  this.product={
    "product_id":  this.Find_Customer_Cart.items[i].id,
    "product_name": this.Find_Customer_Cart.items[i].title,
    "qty": this.Find_Customer_Cart.items[i].quantity,
    "product_amount": this.Find_Customer_Cart.items[i].amount,
    "discount_type": 1,
    "discount_amount": 10
}
this.ProductArr.push(this.product)
}

console.log("ProductArr",this.ProductArr)
return this.ProductArr
  }

  Checkout(){
    if(this.Login_User){

      if(this.Find_Customer_Cart){
        
      this.data={
        "order_date": this.Date(0),
      "special_note": "its special",
      "estimate_delivery_date": this.Date(3),
      "sub_total": this.Subtotal(),
      "tax_amount": this.GST.toFixed(2),
      "discount_amount": 10,
      "total_amount": this.Total,
      "paid_amount": this.Total,
      "payment_type": 2,
      "order_products":this.get_cart_data(),
    }
    console.log("cart",this.cart)
    this._cartservice.setCartTotal(this.Total);
    localStorage.setItem('Cart_Data', JSON.stringify(this.data)); // To set the value
  // this._cartservice.Cartdata=this.data
  console.log("this._cartservice.Cartdata",this._cartservice.Cartdata)
  
  
  this.route.navigate(['/front/cart/checkout'])
}
}else{
  this.toastr.error("You Have To Login For Checkout","Please Login")
}
}
  
  
  
    
  
  
}  
