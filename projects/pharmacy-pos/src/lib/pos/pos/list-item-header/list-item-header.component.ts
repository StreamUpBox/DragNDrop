import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PosCateoriesState } from '../../../importables/store/states/PosCategoryStates';
import { Category } from '../../../importables/categories/api/category';
import { ClosePosCategory } from '../../../importables/store/actions/pos-categories.action';

@Component({
  selector: 'pos-list-item-header',
  templateUrl: './list-item-header.component.html',
  styleUrls: ['./list-item-header.component.scss'],
})
export class ListItemHeaderComponent implements OnInit {
  @Select(PosCateoriesState.category) category$: Observable<Category>;
  constructor(private store:Store,private router: Router) { }

  ngOnInit() {
  }
  goBackToCategory(){
    this.store.dispatch(new ClosePosCategory());
    return this.router.navigate(['/admin/pos/till-categories']);
  }
}
