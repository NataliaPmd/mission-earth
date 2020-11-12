import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html',
  styles: [
  ]
})
export class BoosterComponent implements OnInit{
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input() progress: number = 50;
  @Input() btnClass: string = "btn-primary"; 

  @Output() outputValue : EventEmitter<number>= new EventEmitter();
  changeValue (value: number) {
    if(this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      this.progress = 100;
      return;
    }
    if(this.progress <= 0 && value <= 0) {
      this.outputValue.emit(0);
      this.progress = 0;
      return;
    }
    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);
  }
  onChange( newValue: number ) {
    if(newValue >= 100) {
      this.progress = 100;
    }else if(newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.outputValue.emit(this.progress);
  }
}
