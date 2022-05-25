import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {

  @Input() jsonDataKeys!: string []
  @Input() chooseItem: any
  @Input() modalTitle!: string
  @Input() cloneObj: any

  @Output() close = new EventEmitter<boolean>()
  @Output() btnAddClose = new EventEmitter<any>()

  public onSaveChanges(): void {
    this.close.emit()
  }

  public onClose(): void {
    if (this.modalTitle === 'Edit') {
      for (let key in this.cloneObj) {
        this.chooseItem[key] = this.cloneObj[key];
      }
      this.close.emit()

    } else {
      this.close.emit()
      this.btnAddClose.emit()
    }
  }
}
