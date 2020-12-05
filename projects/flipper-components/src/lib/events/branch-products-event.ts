import { BusEvent } from '@enexus/flipper-event'
import { BranchProducts } from '../entries/branch-products'

export class BranchProductsEvent extends BusEvent {
  public static readonly CHANNEL = 'branchProducts'

  constructor(public branchProducts: BranchProducts[]) {
    super(BranchProductsEvent.CHANNEL)
  }
}
