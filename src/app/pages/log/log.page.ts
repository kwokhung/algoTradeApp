import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { LoggerService } from '../../services/logger/logger.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {

  logs: string[] = [];

  constructor(private alertCtrl: AlertController, private logger: LoggerService) { }

  ngOnInit() {
    this.getLogs();
  }

  getLogs() {
    this.logger.getLogs().subscribe(data => {
      this.logs = data.slice(0);
      this.logs = this.logs.reverse();
    });
  }

  async openLogDetails(log: any) {
    (await this.alertCtrl.create({
      header: 'Log Details',
      subHeader: (typeof log === "string" ? log : JSON.stringify(log)),
      buttons: ['Close']
    })).present();
  }

}
