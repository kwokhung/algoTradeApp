import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  wasTapped: boolean = false;
  time: string = '';
  message: string = '';

  constructor(private route: ActivatedRoute) {
    this.wasTapped = this.route.snapshot.params['wasTapped'] == 'true' ? true : false;
    this.time = this.route.snapshot.params['time'];
    this.message = this.route.snapshot.params['message'];
  }

  ngOnInit() {
  }

}
