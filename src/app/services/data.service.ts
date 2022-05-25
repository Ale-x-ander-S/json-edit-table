import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {NgxCsvParser} from 'ngx-csv-parser';
import {ngxCsv} from 'ngx-csv/ngx-csv';


@Injectable({providedIn: "root"})

export class DataService {

  public readonly inputJson$ = new BehaviorSubject<any>([])
  private header: boolean = true;

  constructor(private ngxCsvParser: NgxCsvParser) {
  }

  public getJSON(data: any): void {
    this.inputJson$.next(data)
  }

  public deleteLastItem(data: any[]): void {
    data.pop()
  }

  public fileChangeListener(event: any): Observable<any> {
    const files = event.srcElement.files;
    return this.ngxCsvParser.parse(files[0], {header: this.header, delimiter: ','})
  }

  public createCsv(data: any, options: any) {
    new ngxCsv(data, 'Result', options);
  }
}
