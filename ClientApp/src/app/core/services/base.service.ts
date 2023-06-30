import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }
  protected dxGridDataSourceLoadParse(loadOptions: any) {

    if (!loadOptions) return '';

    let filter: string = loadOptions.filter ? encodeURIComponent(JSON.stringify(loadOptions.filter)) : '';
    let grouping: string = loadOptions.group ? JSON.stringify(loadOptions.group) : '';
    let sort: string = loadOptions.sort ? JSON.stringify(loadOptions.sort) : '';
    let take: number = loadOptions.take ? loadOptions.take : 0;
    let skip: number = loadOptions.skip ? loadOptions.skip : 0;
    let searchExpr = loadOptions.searchExpr ? JSON.stringify(loadOptions.searchExpr) : '';
    let searchOperation = loadOptions.searchOperation;
    let searchValue = encodeURIComponent(loadOptions.searchValue);

    let params = `?filter=${filter}&take=${take}&skip=${skip}&sort=${sort}&group=${grouping}&requireTotalCount=true&searchExpr=${searchExpr}&searchOperation=${searchOperation}&searchValue=${searchValue}`;

    if (loadOptions.sort) {
      params += '&orderby=' + loadOptions.sort[0].selector;
      if (loadOptions.sort[0].desc) {
        params += ' desc';
      }
    }
    return params;
  }

}
