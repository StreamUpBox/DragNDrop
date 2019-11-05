import { Component, OnInit } from '@angular/core';
import * as alasql from 'alasql';
const sql = alasql;

@Component({
  selector: 'lib-pharmacy-pos',

  template: `<standard-pos></standard-pos>`,
  styles: []

})
export class PharmacyPosComponent implements OnInit {

  constructor() {
    // window.alasql;
    console.log("hello world");
    // alasql.
    sql("CREATE TABLE test (language INT, hello STRING)");
    sql("INSERT INTO test VALUES (1, 'Hello!')");
    sql("INSERT INTO test VALUES (2, 'Aloha!')");
    sql("INSERT INTO test VALUES (3, 'Bonjour!')");


    const results = sql("SELECT * FROM test WHERE language > 1");
    console.log(results);
   }

  ngOnInit() {
   
    // alasql("CREATE TABLE test (language INT, hello STRING)");
    console.log("init ");
  }

}
