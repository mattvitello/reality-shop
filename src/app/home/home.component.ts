import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var ShopifyBuy: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  shopItems: any[] = [
    {src: "/assets/shirt1.jpg", shopifyId: 4313375277113, divId: 'shirt1', name: 'Reality Shirt', price: '$25'},
    {src: "/assets/shirt2.jpg", shopifyId: 2232962875449, divId: 'shirt2', name: 'Reality Hoodie', price: '$45'},
    {src: "/assets/shirt3.jpg", shopifyId: 2232965005369, divId: 'shirt3', name: 'Cool Pants', price: '$45'},
    {src: "/assets/shirt4.jpg", shopifyId: 4313375277113, divId: 'shirt4', name: 'My Poster', price: '$15'},
    {src: "/assets/shirt5.jpg", shopifyId: 2232965005369, divId: 'shirt5', name: 'Bundle Test One', price: '$100'},
    {src: "/assets/shirt6.jpg", shopifyId: 2232962875449, divId: 'shirt6', name: 'Bundle Test Two', price: '$130'}
  ];
  shopifyUI: any;
  userHasClicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    var client = ShopifyBuy.buildClient({
      domain: 'greasemerch.myshopify.com',
      storefrontAccessToken: '270d86d30fc3da6e01619d075834f350'
    });
    this.shopifyUI = ShopifyBuy.UI.init(client);
  }

  ngAfterViewInit(): void {
    this.shopItems.forEach(item => {
      this.InitializeShopifyItem(item.shopifyId, item.divId);
    });
  }

  showShop() {
    this.userHasClicked = true;

    const cartBtn = document.getElementsByClassName('shopify-buy-frame--toggle')[0];
    cartBtn.classList.add("show-cart-btn");
  }

  InitializeShopifyItem(shopId, divId): void {
    if(shopId != "soldout"){
      this.shopifyUI.createComponent('product', {
          id: shopId,
          node: document.getElementById(divId),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            "product":{"variantId":"all","width":"100%",
            "contents":{"img":false,"imgWithCarousel":false,"title":false,"variantTitle":false,"price":false,"description":false,"buttonWithQuantity":false,"quantity":false},
            "text": {
              "outOfStock": "SOLD OUT",
            },
            "styles":{
              "product":{"text-align":"center"},
              "button": {
                "color": "#000",
                "background": "transparent",
                "border": "1px solid #000",
                "font-family": "\"Bungee\", \"Helvetica Neue\", Arial",
                "filter": "blur(0.5px)",
                "font-weight": "bold",
                "font-size": "0.9em",
                ":hover": {"background-color": "transparent"},
                ":focus": {
                  "background-color": "transparent",
                  "outline": "0 !important"
                },
                "padding": "12px 58px",
                "position":"absolute",
                "top": "0",
                "right":"0",
                "width":"70%",
                "text-transform": "uppercase"
                //"padding":"10px 24px 10px 24px"
              },
              "options":{
                "width": "100% !important",  //140  //207
                "display": "block !important",
                "max-width": "none !important"
              },
              "buttonWrapper":{
                "text-align": "start"
              }
            }
          },
          "option":{
            "styles":{
              "option":{
                "cursor":"pointer",
                "width":"27%",
                ":focus":{
                  "outline":"0 !important"
                }
              },
              "wrapper":{
                "background-color":"transparent",
                "border-color":"black",
                "border-width":"1px",
                "vertical-align":"center",
                "cursor":"pointer",
                ":focus":{
                  "outline":"0 !important"
                }
              },
              "select":{
                "color":"black",
                "font-family": "\"Bungee\", \"Helvetica Neue\", Arial",
                "font-weight": "bold",
                "font-size": "0.9em",
                "margin-left":"-2px",
                "filter": "blur(0.4px)",
                "cursor":"pointer",
                ":focus":{
                  "outline":"0 !important"
                },
                "padding":"12px 10px 12px 10px"
              },
              "selectIcon":{
                "fill":"black",
                ":focus":{
                  "outline":"0 !important"
                }
              },
              "optionSelected":{
                "color": "black"
              }
            },
            "googleFonts": [
              "Bungee"
            ]
          },
          "cart":{"contents":{"button":true},
          "styles":{
            "footer":{"background-color":"#fff","border-top":"1px solid black"},
            "button":{
              "background-color":"transparent",
              "color": "black",
              "border": "1px solid black"
            }
          }},
          "toggle":{
            "styles":{
              "toggle":{
                "background-color": "transparent",
                "color": "#000"
              },
              "iconPath":{
                "fill": "#000"
              },
              "count":{
                "font-size": "11px",
                "margin-bottom": "0px"
              }
            }
          },
          "modalProduct":{"contents":{"img":false,"imgWithCarousel":true,"variantTitle":false,"buttonWithQuantity":true,"button":false,"quantity":false},
          "styles":{"product":{"@media (min-width: 601px)":{"max-width":"100%","margin-left":"0px","margin-bottom":"0px"}}}},

          "productSet":{"styles":{"products":{"@media (min-width: 601px)":{"margin-left":"-20px"}}}}},
        });
    }
  }

}
