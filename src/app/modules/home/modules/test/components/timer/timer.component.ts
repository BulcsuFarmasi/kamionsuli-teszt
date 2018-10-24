import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { TimeService } from '../../../../../../services/time.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  time:string;
  private countDownSeconds
  @Output('timeexpired') timeexpired:EventEmitter<boolean> = new EventEmitter()
  
  constructor(private timeService:TimeService) { }

  ngOnInit() {
    this.time = '01:00';
    this.countDownSeconds=this.timeService.stringToSeconds(this.time);
  }

  startCountDown () {
    let timer = setInterval(() => {
      this.countDownSeconds--;
			if(this.countDownSeconds === 0){
				clearInterval(timer);
				this.timeexpired.emit();
			}
			this.time = this.timeService.secondsToString(this.countDownSeconds);
		}, 1000)
  }

}
