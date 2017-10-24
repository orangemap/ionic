import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service'
import { DetailPage } from '../detail/detail'
/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  //轮播商品
  carouselItems: Array<any> = [];
  //保存的推荐商品的对象数组
  recommendedItems: Array<any> = [];
  //跳转到详情需要的detail
  detail;
  constructor(private myHttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.detail = DetailPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    //this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  //初始化数据
  //"https://jsonplaceholder.typicode.com/posts"
  loadData() {
    this.myHttp
      .sendRequest(this, "http://localhost/framework_codes/data/product/index.php")
      .subscribe((data: any) => {
        console.log(data);
        if (data && data.carouselItems) {
          //轮播图，使用slides进行autoplay
          this.carouselItems = data.carouselItems;
          this.recommendedItems = data.recommendedItems;
          console.log('saved recommendedItems is ', this.recommendedItems);
        }
      })
  }

}
