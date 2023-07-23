import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homeresult',
  templateUrl: './homeresult.page.html',
  styleUrls: ['./homeresult.page.scss'],
})
export class HomeresultPage implements OnInit {
  u: any;
  p: any;
  e: any;
  i: any;
  tmpparam: any;
  constructor(public ar: ActivatedRoute) { }

  ngOnInit() {
    // this.u = this.ar.snapshot.paramMap.get('uname');
    // this.p = this.ar.snapshot.paramMap.get('upwd');
    // this.e = this.ar.snapshot.paramMap.get('uem');
    // this.i = this.ar.snapshot.paramMap.get('uimg');
    this.tmpparam = this.ar.snapshot.paramMap.get('dataobj');
    let getobj = JSON.parse(this.tmpparam);
    this.u = getobj["getname"];
    this.p = getobj["getpassword"];
    this.e = getobj["getemail"];
    this.i = getobj["getimage"];

    console.log("Username",this.u)
    console.log("Password=",this.p)
    console.log("Email=",this.e)
    console.log("Image=",this.i)
  }
  
}
