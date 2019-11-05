import {
    AfterContentInit,
    Component,
    ContentChildren, Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatColumnDef, MatPaginator, MatTable} from '@angular/material';
import {PaginatedDataTableSource} from './data/paginated-data-table-source';
import { Observable } from 'rxjs/internal/Observable';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
      trigger("detailExpand", [
        state(
          "collapsed",
          style({ height: "0px", minHeight: "0", display: "none" })
        ),
        state("expanded", style({ height: "*" })),
        transition(
          "expanded <=> collapsed",
          animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
        )
      ])
    ]
})
export class DataTableComponent<T> implements OnInit, AfterContentInit {

  centered = false;
  disabled = false;
  unbounded = false;
  radius: number=100;
  color: string='#e8f0fe';

    /**
     * Instance of material table.
     */
    @ViewChild(MatTable, {static:true}) table: MatTable<T>;

    /**
     * Column definitions provided via ng-content.
     */
    @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

    /**
     * Instance of material paginator component.
     */
    @ViewChild(MatPaginator, {static:true}) matPaginator: MatPaginator;

    /**
     * Data table source provided by user.
     */
    @Input() public dataSource: PaginatedDataTableSource<T>;

    /**
     * Display name for items inside the data table.
     */
    @Input() public itemsName: string;

    @Input() public hiddenCheckBox: boolean=false;
    @Input() public isLoading: boolean=false;
    @Input() public canExpandedDetail:boolean=false;
    @Input() public notFoundMessage: string=null;
    @Input() public hiddenHeader: boolean=false;
    /**
     * Columns that should be displayed in data table.
     */
    public columns: string[] = ['select'];
    enableRowSelected=null;
    constructor(){}
    ngOnInit() {
        this.dataSource.config.matPaginator = this.matPaginator;
        this.dataSource.config.matSort.start = 'desc';
        if ( ! this.dataSource.config.delayInit) this.dataSource.init();
    }
   

    ngAfterContentInit() {
        // Register the normal column defs to the table
        this.columnDefs.forEach(columnDef => {
            this.columns.push(columnDef.name);
            this.table.addColumnDef(columnDef);
        });
    }
}
