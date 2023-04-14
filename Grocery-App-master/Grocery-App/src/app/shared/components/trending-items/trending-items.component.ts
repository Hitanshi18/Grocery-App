import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-items',
  templateUrl: './trending-items.component.html',
  styleUrls: ['./trending-items.component.css']
})
export class TrendingItemsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
  products = [
    {
      img:"../assets/peach.png",
      name:"orange 1Kg",
      reviews:"review",
      price:"$3.99",
      discountedPrice:"$2"
    },
    {
      img:"../assets/peach.png",
      name:"orange 1Kg",
      reviews:"review",
      price:"$3.99",
      discountedPrice:"$2"
    },
    {
      img:"../assets/peach.png",
      name:"orange 1Kg",
      reviews:"review",
      price:"$3.99",
      discountedPrice:"$2"
    }
  ]

}
