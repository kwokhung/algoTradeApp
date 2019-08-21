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
        console.log(JSON.stringify(data));

        if (data.wasTapped) {
          console.log('wasTapped');

          this.router.navigate(['notification', { wasTapped: 'true', time: data.time, message: data.message }]);
        } else {
          console.log('not wasTapped');

          if (data.title === 'Notification') {
            this.router.navigate(['notification', { wasTapped: 'false', time: data.time, message: data.message }]);
          } else {
            console.log(data.message);
            this.logger.addLog(data.message);
          }
        }
      });

      this.fcm.subscribeToTopic('algoTrade');
    });
  }

}
