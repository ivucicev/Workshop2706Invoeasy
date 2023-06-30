

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { BaseService } from '@core/services/base.service';
import { ToastService } from '@core/services/toast-service.service';
import { ResolvedData as LoadResult } from 'devextreme/data/custom_store';
import { InvoiceDTO } from '@models/InvoiceDTO';
import { InvoiceBM } from '@models/InvoiceBM';

@Injectable({ providedIn: 'root' })
export class InvoiceService extends BaseService {

    constructor(protected _http: HttpClient, private _toast: ToastService) {
        super();
    }
    public createInvoice = (invoice: InvoiceBM, showMessage: boolean = true): Observable<boolean> => {
        return this._http.post<boolean>(`api/Invoice`, invoice).pipe(tap(t => { if (showMessage) this._toast.success() }));
    };
    public updateInvoice = (id: string, invoice: InvoiceBM, showMessage: boolean = true): Observable<boolean> => {
        return this._http.put<boolean>(`api/Invoice/${id}`, invoice).pipe(tap(t => { if (showMessage) this._toast.success() }));
    };
    public getInvoiceById = (id: string): Observable<InvoiceDTO> => {
        return this._http.get<InvoiceDTO>(`api/Invoice/${id}`);
    };
    public deleteInvoiceById = (id: string, showConfirmation: boolean = true): Observable<boolean> => {
        if (showConfirmation == false || window.confirm("You sure?")) {
            return this._http.delete<boolean>(`api/Invoice/${id}`);
        } else {
            return new Observable(subscriber => subscriber.complete());
        }
    };
    public getAllInvoices = (): Observable<InvoiceDTO[]> => {
        return this._http.get<InvoiceDTO[]>(`api/Invoice/all`);
    };
    public getComponents = (loadOptions: any): Promise<LoadResult<any> | any> => {
        return this._http.get<LoadResult<any>>(`api/Invoice/grid${this.dxGridDataSourceLoadParse(loadOptions)}`)
            .toPromise()
            .then(response => {
                return response;
        }).catch(error => {
            throw 'Data Loading Error';
        });
    };
}