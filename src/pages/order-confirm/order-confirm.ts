import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPage } from '../pay/pay'
/**
 * Generated class for the OrderConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
  styleUrls: ['../assets/css/order_confirm.css']
})
export class OrderConfirmPage {

  constructor(public modalCtr: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
  }

  pay() {
    let myWidnow = this.modalCtr.create(PayPage);
    console.log('准备显示');
    myWidnow.present();
  }

}
