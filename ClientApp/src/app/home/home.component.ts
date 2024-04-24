import { Component, ViewChild, ViewChildren } from '@angular/core';
import { InvoiceFormComponent } from '../../_autogen/form-components/invoice-form.component';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
    now = new Date();

    @ViewChild(InvoiceFormComponent)
    public invoiceform!: InvoiceFormComponent

    public onLoaded(e: any) {
        console.log(this.invoiceform)

        this.invoiceform.setTagBoxDataSource('selectedItems', [{ id: 1, name: 'jodsip' }, { id: 2, name: 'dalibro'}])
        this.invoiceform.setDropwdownBoxDataSource('customerId', [{ id: 1, name: 'jodar' }, { id: 2, name: 'brosip'}])
        this.invoiceform.setLookupBoxDataSource('supplierId', [{ id: 1, name: 'devops' }, { id: 2, name: 'libor'}])
        this.invoiceform.setSelectBoxDataSource('manufacturerId', [{ id: 1, name: 'jeli' }, { id: 2, name: 'bor'}])
    }
}
