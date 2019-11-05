import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { NoResultsMessageComponent } from './no-results-message/no-results-message.component';
import { CommonModule } from '@angular/common';
import { EnterKeybindDirective } from './enter-keybind.directive';
import {MatIconRegistry} from '@angular/material';
import { ConfirmModalModule } from './confirm-modal/confirm-modal.module';
import { LoggedInUserWidgetComponent } from './logged-in-user-widget/logged-in-user-widget.component';
import { MaterialNavbar } from './material-navbar/material-navbar.component';
import { FormattedDatePipe } from './formatted-date.pipe';
import { BreakpointsService } from './breakpoints.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Settings } from '../config/settings.service';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SwitchBranchModelComponent } from './switch-branch/switch-branch-model/switch-branch-model.component';
import { SwitchBranchComponent } from './switch-branch/switch-branch/switch-branch.component';
import { MaterialModule } from '../material/material.module';
import { TranslationsModule } from '../translations/translations.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,

        // internal
        // CustomScrollbarModule,
        ConfirmModalModule,
        MaterialModule,
        TranslationsModule
    ],
    declarations: [
        SwitchBranchModelComponent,
         SwitchBranchComponent,
        LoadingIndicatorComponent,
        NoResultsMessageComponent,

        EnterKeybindDirective,
        LoggedInUserWidgetComponent,
        MaterialNavbar,
       
        FormattedDatePipe,
        NotFoundPageComponent
    ],
    exports: [
        SwitchBranchModelComponent,SwitchBranchComponent,
        LoadingIndicatorComponent,
        NoResultsMessageComponent,
        EnterKeybindDirective,
        LoggedInUserWidgetComponent,
        MaterialNavbar,
        FormattedDatePipe,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslationsModule,
        // internal
        ConfirmModalModule,
        // CustomScrollbarModule
    ],
    entryComponents: [],
    providers: [BreakpointsService]
})
export class UiModule {
    constructor(
        private icons: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private config: Settings,
    ) {
        const url = this.config.getAssetUrl('icons/merged.svg');
        this.icons.addSvgIconSet(
            this.sanitizer.bypassSecurityTrustResourceUrl(url)
        );
    }
}
