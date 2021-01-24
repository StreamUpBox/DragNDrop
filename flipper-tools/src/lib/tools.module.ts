import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PrettyStringPipe } from './pretty-string.pipe'
import { MarkdownToHtmlPipe } from './markdown-to-html.pipe'
import { QueryParamsToStringPipe } from './query-params-to-string.pipe'

@NgModule({
  imports: [CommonModule],
  declarations: [PrettyStringPipe, MarkdownToHtmlPipe, QueryParamsToStringPipe],
  exports: [PrettyStringPipe, MarkdownToHtmlPipe, QueryParamsToStringPipe],
  providers: [QueryParamsToStringPipe],
})
export class ToolsModule {}
