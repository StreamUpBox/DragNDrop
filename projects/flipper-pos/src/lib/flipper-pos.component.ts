import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as alasql from 'alasql';
import { Menu } from '@enexus/flipper-components/public_api';
const sql = alasql;
@Component({
  selector: 'flipper-flipper-pos',
  template: `
    <p>
      flipper-pos works!
    </p>
  `,
  styles: []
})
export class FlipperPosComponent implements OnInit {

  constructor() {
    // this.get('business');
    //this.create<Menu>('menu',['id'],[]);
  }

  ngOnInit() {
    // window.alasql;
    // console.log("hello world");
    // // alasql.
    // sql("CREATE TABLE test (language INT, hello STRING)");
    // sql("INSERT INTO test VALUES (1, 'Hello!')");
    // sql("INSERT INTO test VALUES (2, 'Aloha!')");
    // sql("INSERT INTO test VALUES (3, 'Bonjour!')");


    // const results = sql("SELECT * FROM test WHERE language > 1");
    // console.log(results);
  }
 
  //table definition


  //getters
  // get(TABLE):Observable<T>{
  //   return sql("SELECT * FROM  "+TABLE) as Observable<T>;
  // }
  // create<T>(TABLE,COLUMNS:Array<T>,VALUES):Array<T>{
  //   return sql("CREATE TABLE "+TABLE+" ("+COLUMNS+") ("+VALUES+")");
  // }
  
  
}

