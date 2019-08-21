import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FCM } from '@ionic-native/fcm/ngx';
import { LoggerService } from './services/logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [{
    title: 'Home',
    url: '/home',
    icon: 'home'
  }, {
    title: 'List',
    url: '/list',
    icon: 'list'
  }, {
    title: 'Notification',
    url: '/notification',
    icon: 'warning'
  }, {
    title: 'Log',
    url: '/log',
    icon: 'clipboard'
  }];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private fcm: FCM,
    private logger: LoggerService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getToken().then(token => {
        console.log(token);
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);

        if (data.wasTapped) {
          console.log('Received in back ground');

          if (data.title !== 'Notification') {
            this.logger.addLog(data.message);
          }

          this.router.navigate([data.landing_page, { wasTapped: 'true', time: data.time, message: data.message }]);
        } else {
          console.log('Received in fore ground');

          if (data.title !== 'Notification') {
            this.logger.addLog(data.message);
          }

          this.router.navigate([data.landing_page, { wasTapped: 'false', time: data.time, message: data.message }]);
        }
      });

      this.fcm.subscribeToTopic('algoTrade');
    });
  }

}
