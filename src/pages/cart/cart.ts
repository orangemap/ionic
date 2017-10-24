import { ViewChild, Component } from '@angular/core';
import { IonicPage, Tabs, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service'

import { IndexPage } from '../index/index'
import { OrderConfirmPage } from '../order-confirm/order-confirm'
import { LoginPage } from '../login/login'

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  productList: Array<any> = [];
  totalPrice = 0;
  index;
  orderConfirm;
  isLogin: boolean = false;
  @ViewChild("myTabs") myTabs: Tabs;



  constructor(private myHttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.index = IndexPage;
    this.orderConfirm = OrderConfirmPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }



  ionViewDidEnter() {
    this.guard();
    this.loadData();
  }

  loadData() {
    this.myHttp
      .sendRequest(this, "http://localhost/Framework_codes/data/cart/list.php")
      .subscribe((result) => {
        console.log('cart', result);
        if (result.code == 200) {
          this.productList = result.data;
        }
      })
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (var i = 0; i < this.productList.length; i++) {
      this.totalPrice += (this.productList[i].count * this.productList[i].price);
    }
    console.log("计算后的总价格信息为", this.totalPrice);
    return this.totalPrice;
  }

  //从购物车中移除
  deleteFromList(index) {
    this.myHttp.sendRequest(this, "http://localhost/Framework_codes/data/cart/del.php?iid=" + this.productList[index].iid)
      .subscribe((result: any) => {
        if (result && result.code == 200) {
          this.productList.splice(index, 1);
        }
      })
  }

  //修改购物车数量
  modifyCount(isMinux: boolean, index: number) {

    let readyModifyCount = this.productList[index].count;
    console.log('修改前是:' + readyModifyCount);

    if (isMinux) {
      readyModifyCount--;
      if (readyModifyCount == -1) {
        return;
      }
    }
    else {
      readyModifyCount++;
    }
    this.productList[index].count = readyModifyCount;

  }

  getIndex() {
    this.navCtrl.parent.select(0);
  }


  //守卫
  guard() {
    this.myHttp.checkUserLogin().subscribe((data) => {
      console.log('login', data);
      if (data.uid) {
        this.isLogin = true;
        return true;
      }
      else {
        this.isLogin = false;
        this.myHttp.showToast('未登录，准备跳转到登录页面');
        this.navCtrl.push(LoginPage, { from: this });
        return false;
      }
    })
    return false;
  }
}
