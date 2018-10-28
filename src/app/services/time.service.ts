export class TimeService{
    stringToSeconds(timeString:string) {
        console.log(timeString);
        if (!timeString) {
            return;
        }
        let seconds:number = 0;
        let timeParts:string[]=timeString.split(':');
        seconds += parseInt(timeParts[0]) * 60;
        seconds += parseInt(timeParts[1]);

        return seconds;
    }

    secondsToString(fullSeconds:number) {
        console.log(fullSeconds);
        let minutes = Math.floor(fullSeconds / 60);
        let seconds = fullSeconds - minutes * 60;

        return this.addZero(minutes) + ':' + this.addZero(seconds);
    }

    private addZero(number:number|string) {
        if (number < 10) {
            number = '0' + number;
        }
        return number;
    }
}