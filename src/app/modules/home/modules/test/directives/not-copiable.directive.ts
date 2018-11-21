import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[notCopiable]'
})
export class NotCopiableDirective {

  constructor() { }

  @HostListener('contextmenu') 
  onContextmenu () {
    return false;
  }

  @HostListener('dragstart') 
  onDragstart () {
    return false;
  }

  @HostListener('selectstart') 
  onSelectstart () {
    return false;
  }

}
