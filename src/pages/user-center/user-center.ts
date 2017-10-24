import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service'

/**
 * Generated class for the UserCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {

  constructor(private myHttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCenterPage');
  }

  logout() {
    this.myHttp
      .sendRequest(this, "http://localhost/Framework_codes/data/user/logout.php")
      .subscribe((data) => {
        if (data.code == 200) {
          this.myHttp.showToast('退出成功');
          this.navCtrl.parent.select(0);
        }
      })
  }

}
