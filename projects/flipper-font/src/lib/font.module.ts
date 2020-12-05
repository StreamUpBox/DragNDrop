import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontSizeClassPipe } from './font-size-class.pipe'
import { FontWeightClassPipe } from './font-weight-class.pipe'

@NgModule({
  imports: [CommonModule],

  declarations: [FontWeightClassPipe, FontSizeClassPipe],
  exports: [FontWeightClassPipe, FontSizeClassPipe],
  providers: [FontWeightClassPipe, FontSizeClassPipe],
})
export class FontModule {}
