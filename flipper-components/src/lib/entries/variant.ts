
export class Variant {
  id:          string
  name:        string
  sku:         string
  productId:   string
  unit:        string
  table:       string
  currentStock: number
  canTrackingStock:boolean
  channels:    string[]
  retailPrice:number
  supplyPrice:number
  productName: string
  stockId:string

  //this are not from api but necessary needed for our strong typing
  quantity:number
  orderId:string
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
