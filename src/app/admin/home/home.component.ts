import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any
  constructor(private auth: AuthenticationService, private toast:NgToastService) { }

  ngOnInit(): void {
  }
  getData(){
    this.auth.getVal().subscribe((res:any)=>{
      this.toast.success({detail:'Success',summary:'Data Call Successful'})
      this.user = res['payload']['data']
      console.log(this.user)
    })
}
}
