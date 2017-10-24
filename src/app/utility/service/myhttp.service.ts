import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoadingController } from 'ionic-angular'
import { AlertController } from 'ionic-angular'
import { ToastController } from 'ionic-angular'

@Injectable()
export class MyHttpService {
    constructor(private toastCtr: ToastController, private alertCtrl: AlertController, private loadCtr: LoadingController, private http: Http) { }

    showToast(msg) {
        this.toastCtr.create({
            message: msg,
            duration: 1500,
            position: 'bottom'
        }).present();
    }

    checkUserLogin() {
        return this.http.get('http://localhost/Framework_codes/data/user/session_data.php', { withCredentials: true })
            .map((response: Response) => response.json());
    }

    sendRequest(obj: any, url: string) {
        let myLoad = this.loadCtr.create({
            content: 'loading...',
            spinner: 'bubbles'
        });
        myLoad.present();
        console.log('准备发起请求,url is ' + url);
        //a-http-get
        return this.http.get(url, { withCredentials: true })
            .map((response: Response) => {
                console.log('请求成功');
                myLoad.dismiss();
                console.log(response);
                return response.json()
            })
            .catch((error: any) => {
                console.log('请求失败', error.json());
                myLoad.dismiss();
                this.alertCtrl.create({
                    title: 'oops',
                    message: '请求失败',
                    buttons: [
                        {
                            text: '重试',
                            handler: () => {
                                console.log('准备再次发起请求');
                                obj.loadData();
                            }
                        }, {
                            text: '取消',
                            role: 'cancel'
                        }
                    ]
                }).present();
                return '请求失败'
            })
            ;
    }

}