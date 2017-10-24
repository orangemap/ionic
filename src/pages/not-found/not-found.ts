import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotFoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-not-found',
  templateUrl: 'not-found.html',
})
export class NotFoundPage {
  time = 3;
  timer = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotFoundPage');
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.time--;
      if (this.time == 0) {
        console.log("定时器已经结束了");
        clearInterval(this.timer);
        this.timer = null;
        this.navCtrl.pop();
      }
    }, 1000);
  }

  ionViewWillLeave() {

    if (this.timer) {
      console.log('准备离开404页面时，发现没关，现在关了');
      clearInterval(this.timer);
      this.timer = null;
    }
  }

}
