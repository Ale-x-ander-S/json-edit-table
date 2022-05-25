import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-unloading',
  templateUrl: './unloading.component.html',
  styleUrls: ['./unloading.component.scss']
})

export class UnloadingComponent implements OnInit, OnDestroy {

  jsonData: any[] = []
  jsonDataKeys: string[] = []
  flagModal: boolean = false;
  chooseItem: any
  modalTitle: string = ''
  unloadStr: string = ''
  error: string = ''
  cloneObj: any = {}

  subJsonData = new Subscription()

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    try {
      this.subJsonData = this.dataService.inputJson$.subscribe(data => this.jsonData = data)
      this.getKeys()
      this.unload()
    } catch (error: any) {
      this.error = error
    }
  }

  private getKeys(): void {
    this.jsonData.forEach(el => {
      this.jsonDataKeys = Object.keys(el)
    })
  }

  copyItem() {
    for (let key in this.chooseItem) {
      this.cloneObj[key] = this.chooseItem[key];
    }
  }

  public onEdit(item: any): void {
    this.chooseItem = item
    this.copyItem()
    this.flagModal = true
    this.modalTitle = 'Edit'
  }

  public onDelete(index: number): void {
    this.jsonData.splice(index, 1)
    this.unload()
  }

  public addItem(): void {
    this.jsonDataKeys.forEach(el => {
      this.chooseItem = {}
    })
    this.jsonData.push(this.chooseItem)
    this.flagModal = true
    this.modalTitle = 'Add'
  }

  public unload(): void {
    this.unloadStr = JSON.stringify(this.jsonData)
  }

  public createAndDownloadCsv(): void {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      title: false,
      useBom: true,
      noDownload: false,
      headers: this.jsonDataKeys
    };
    this.dataService.createCsv(this.jsonData, options)
  }

  ngOnDestroy() {
    this.subJsonData.unsubscribe()
  }
}
