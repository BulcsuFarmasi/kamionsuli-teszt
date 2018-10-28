import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

import { TimeService } from '../../../../../../services/time.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements DoCheck {

  
  private countDownSeconds:number;
  @Input('time') time:string;
  @Output('timeexpired') timeexpired:EventEmitter<boolean> = new EventEmitter()
  
  constructor(private timeService:TimeService) { }

  ngDoCheck() {
    this.countDownSeconds=this.timeService.stringToSeconds(this.time);
  }

  startCountDown () {
    let timer = setInterval(() => {
      console.log(this.countDownSeconds);
      this.countDownSeconds--;
			if(this.countDownSeconds === 0){
				clearInterval(timer);
				this.timeexpired.emit();
			}
			this.time = this.timeService.secondsToString(this.countDownSeconds);
		}, 1000)
  }

}
