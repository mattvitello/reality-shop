import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var ShopifyBuy: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  shopItems: any[] = [
    {src: "https://cdn.shopify.com/s/files/1/0004/6166/8409/files/sometimesreality-tee.png?v=1606866914", shopifyId: 5938636128414, divId: 'reality-shirt', name: '"Reality" T-Shirt', price: '$28', sizeGuideImg: 'https://cdn.shopify.com/s/files/1/0004/6166/8409/files/shirt-size.jpg?v=1607090083'},
    {src: "https://cdn.shopify.com/s/files/1/0004/6166/8409/files/sometimesreality-hoodie.png?v=1606866915", shopifyId: 5938652020894, divId: 'reality-hoodie', name: '"Reality" Hoodie', price: '$50', sizeGuideImg: 'https://cdn.shopify.com/s/files/1/0004/6166/8409/files/hoodie-size.jpg?v=1607090083'},
    {src: "https://cdn.shopify.com/s/files/1/0004/6166/8409/files/sometimesreality-dickiespants.png?v=1606866914", shopifyId: 5938796495006, divId: 'reality-pants', name: '"Reality" Pants', price: '$60', sizeGuideImg: 'https://cdn.shopify.com/s/files/1/0004/6166/8409/files/pants-size.jpg?v=1607090083'},
    {src: "https://cdn.shopify.com/s/files/1/0004/6166/8409/files/sometimesreality-poster2.png?v=1607091940", shopifyId: 5938778603678, divId: 'reality-poster', name: '8"x10" PRINT ', price: '$10', sizeGuideImg: ''}
  ];
  shopifyUI: any;
  showSizeChartModal: boolean;
  currentSizeChart: string;

  constructor() { }

  ngOnInit(): void {
    const client = ShopifyBuy.buildClient({
      domain: 'greasemerch.myshopify.com',
      storefrontAccessToken: '270d86d30fc3da6e01619d075834f350'
    });
    this.shopifyUI = ShopifyBuy.UI.init(client);
    
    const mainVid: any = document.getElementById("fallingVideo");
    mainVid.onloadedmetadata = () => {    
      mainVid.muted = true;
      this.shopItems.forEach(item => {
        this.InitializeShopifyItem(item.shopifyId, item.divId);
      });
    };

    mainVid.onloadeddata = () => {
        mainVid.muted = true;
        mainVid.play();
    }
}

  showShop() {
    const siteWrapper = document.getElementById('shop');
    siteWrapper.classList.remove('shop-base');

    const shopContent = document.getElementById('shopContent');
    shopContent.classList.add('fade-in');


    this.showCart();
  }

  showCart() {
    const cartBtn = document.getElementsByClassName('shopify-buy-frame--toggle')[0];
    if (cartBtn) {
      cartBtn.classList.add("show-cart-btn");
    } else {
      setTimeout( () => {this.showCart()}, 500)
    }
  }

  openSizeChartModal(imgSrc) {
    this.currentSizeChart = imgSrc;
    this.showSizeChartModal = true;
  }

  hideSizeChartModal() {
    this.showSizeChartModal = false;
  }

  InitializeShopifyItem(shopId, divId): void {
    if(shopId != "soldout"){
      let addToCartWidth = 'calc(100% - 110px)';
      if (divId === 'reality-poster') {
        addToCartWidth = '100%';
      }

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
                "background": "#cfd890",
                "border": "1px solid #929487",
                "font-family": "\"Roboto\", sans-serif",
                "color":"#000",
                "font-weight": "600",
                "font-size": "13px",
                ":hover": {"background-color": "#d5de9b"},
                ":focus": {
                  "background-color": "#cfd890",
                  "outline": "0 !important"
                },
                "padding": "10px 29px",
                "position":"absolute",
                "top": "0",
                "right":"0",
                "width": addToCartWidth,
                "text-transform": "uppercase",
                "margin-bottom":"0",
                "margin-top":"0"
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
                "width":"100px",
                ":focus":{
                  "outline":"0 !important"
                }
              },
              "wrapper":{
                "background-color":"#efefef",
                "border-color":"#767676",
                "border-width":"1px",
                "vertical-align":"center",
                "cursor":"pointer",
                ":focus":{
                  "outline":"0 !important"
                }
              },
              "select":{
                "font-family": "\"Roboto\", sans-serif",
                "font-weight": "600",
                "font-size": "13px",
                "margin-left":"-2px",
                "color":"#000",
                "cursor":"pointer",
                "margin-bottom":"0",
                "margin-top":"0",
                "line-height": "1.2",
                "text-transform": "uppercase",
                ":focus":{
                  "outline":"0 !important"
                },
                "padding":"10px"
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
              "Roboto"
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
                "color": "#000",
                ":hover":{
                  "background-color": "transparent",
                  "color": "#000000ab",
                  "iconPath":{
                    "fill": "#000000ab",
                  }
                }
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
