import { Directive, HostListener } from '@angular/core';
import { NewComponent } from '../pages/new/new.component';

@Directive({
  selector: '[appScrollTracker]'
})
export class ScrollTrackerDirective {
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const tracker = event.target.scrollingElement;
    // const limit = tracker.scrollHeight - tracker.clientHeight;
    const top = Math.floor(tracker.scrollTop as number);
    if (top > 390) {
      this.showFloatChart();
    }

    if (top < 380) {
      this.hideFloatChart();
    }
  }


  constructor(private host: NewComponent) { }

  showFloatChart() {
    this.host.isFloat = true;
  }

  hideFloatChart() {
    this.host.isFloat = false;
  }

}
