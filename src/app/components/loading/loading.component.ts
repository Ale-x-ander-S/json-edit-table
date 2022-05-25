import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {NgxCSVParserError} from "ngx-csv-parser";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})

export class LoadingComponent implements OnDestroy{

  inputString: string = ''
  inputJson: any[] = []
  error: string = ''

  subFileListener = new Subscription()

  constructor(private router: Router,
              private dataService: DataService) {
  }

  onProceed() {
    try {
      this.inputJson = JSON.parse(this.inputString)
      this.dataService.getJSON(this.inputJson)
      this.router.navigate(['unloading'])
    } catch (error: any) {
      this.error = error
    }
  }

  fileListener(event: any) {
    this.subFileListener = this.dataService.fileChangeListener(event).subscribe({
      next: (result: any): void => {
        this.inputString = JSON.stringify(result);
      },
      error: (error: NgxCSVParserError): void => {
        this.error = error.message
      }
    });
  }

  ngOnDestroy() {
    this.subFileListener.unsubscribe()
  }
}




