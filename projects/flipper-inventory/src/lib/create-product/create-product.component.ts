import { Component, OnInit, HostListener } from '@angular/core';
import { NotificationService, fadeInAnimation, Product, MainModelService, Tables, Variant } from '@enexus/flipper-components';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { DialogService, DialogSize } from '@enexus/flipper-dialog';
import { DisacrdDialogModelComponent } from '../products/disacrd-dialog-model/disacrd-dialog-model.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'flipper-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  animations: [
    trigger('addProduct', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))
    ]),
  ],
})
export class CreateProductComponent implements OnInit {
  set didAddNew(bol) {
    this.addNew = bol;
  }
  get didAddNew(): boolean {
    return this.addNew;
  }
  constructor(private dialog: DialogService, private model: MainModelService, private formBuilder: FormBuilder,

              private router: Router, public product: ProductService,
              protected notificationSvc: NotificationService) {

     }

  get formControl() { return this.form.controls; }
  isFocused = '';
  addNew = false;
  submitted = false;
  form: FormGroup;

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {

    if (event.key === 'Delete') {
      this.deleteProduct();
    }
    if ((event.key === 'Esc' || event.key === 'esc' || event.key === 'ESC')
      || (event.key === 'tab' || event.key === 'Tab' || event.key === 'TAB')) { // shift + (+)
      this.openDiscardDialog();
    }

    if (event.ctrlKey && (event.key === 'N' || event.key === 'n')) {// shift + (-)
      this.onSubmit('new');
    }


    if (event.key === 'Enter') {// shift + k
      this.onSubmit('close');
    }
  }



  async ngOnInit() {
    await this.product.init();
    // await this.checkNewItem();
    const hasDraftProduct = this.product.hasDraftProduct;
    this.form = await this.formBuilder.group({
      name: [hasDraftProduct ? hasDraftProduct.name : '' , Validators.required],
      categoryId: hasDraftProduct ? hasDraftProduct.categoryId : 0,
      description: hasDraftProduct ? hasDraftProduct.description : '',
      picture: hasDraftProduct ? hasDraftProduct.picture : '',
      taxId: hasDraftProduct ? hasDraftProduct.taxId : '',
      supplierId: hasDraftProduct ? hasDraftProduct.supplierId : 0,
      createdAt: new Date(),
      updatedAt: new Date()

    });


  }
  async checkNewItem() {
    this.didAddNew = false;

    await this.product.request();

  }

  updateItem(key, event) {
    let val = '';
    if (key === 'taxId') {
      val = event.value;
    } else {
      val = event.target.value;
    }

    this.product.updateKeyValue(key, val);
    this.product.update();
    this.updateVariantProductName();
  }

updateVariantProductName(){
  const  product = this.model.findByFirst<Product>(Tables.products, 'isDraft', true);
  if (product){
    const variants = this.model.filters<Variant>(Tables.variants, 'productId', product.id);
    if (variants.length > 0){
        variants.forEach(v => {
          v.productName = product.name;
          this.model.update<Variant>(Tables.variants, v, v.id);
        });
      }

  }

}




  async onSubmit(action) {
    this.submitted = true;
    this.didAddNew = false;
    if (this.product.form.invalid) {
      this.notificationSvc.error('Create an item', 'Please enter a name for your item.');
      return;
    }
    await this.product.saveProduct();

    this.goToProduct();

  }
  goToProduct() {
    return this.router.navigate(['/admin/inventory']);
  }

  viewImageUploaded(src) {
    this.product.hasDraftProduct.picture = src;
    this.product.update();
  }

  focusing(value) {
    this.isFocused = value;
  }
  focusingOut() {
    this.isFocused = '';
  }

  deleteProduct() {
    this.product.hasDraft();
    if (this.product.hasDraftProduct && this.product.hasDraftProduct.isCurrentUpdate) {
      this.dialog.delete('Product', [`${this.product.hasDraftProduct.name}`]).subscribe(confirm => {
        this.product.discardProduct();
        this.goToProduct();
      });
    }


  }


  public openDiscardDialog() {
    this.product.hasDraft();
    if (this.product.hasDraftProduct && this.product.hasDraftProduct.isCurrentUpdate) {
      this.onSubmit('close');
    } else {
      return this.dialog.open(DisacrdDialogModelComponent, DialogSize.SIZE_MD).subscribe(result => {

        if (result === 'discard') {
          this.product.discardProduct();
          this.product.updateOnlineDatabase();
          this.goToProduct();
        }

        if (result === 'save') {
          this.onSubmit('close');
        }
      });
    }

  }

}
