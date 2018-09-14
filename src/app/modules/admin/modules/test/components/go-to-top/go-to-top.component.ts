import { Component, HostListener } from '@angular/core';

@Component({
    selector:'go-to-top',
    templateUrl: './go-to-top.component.html'
})
export class GoToTopComponent {
    private timer:any;
    public disabled:boolean = true;
    public limit:number = 10;
    private time:number = 300;


    backToTop () {
        this.startCountDown();
    }

    @HostListener('window:scroll', [])
    onScroll() {
        let scrollTop = window.scrollY;
        if (scrollTop > this.limit && this.disabled){
            this.disabled = false;
        } else if (scrollTop < this.limit && !this.disabled) {
            this.disabled = true;
        }
    }

    startCountDown () {
        let scrollTop = window.scrollY;;
        let distance = scrollTop - this.limit;
        console.log(distance);
        let pxms = (distance / this.time) * -1;
        this.timer = setInterval(() => {
            console.log(pxms);
            window.scrollBy(0, pxms);
            if (window.scrollY == 0) {
                this.endCountDown();
            }
        }, 1)
    }

    endCountDown () {
        clearInterval(this.timer);;
    }
}
