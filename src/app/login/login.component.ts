import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup
  constructor(private fb:FormBuilder, private auth:AuthenticationService, private router:Router, private toast:NgToastService) {
    this.loginform = fb.group({
      email:[''],
      password:['']
    })
  }
  onSubmit(){
    if (this.loginform.valid) {
      this.auth.login(this.loginform.value).subscribe((res) => {
          this.toast.success({detail:'Login Success', summary:'Welcome to Admin Panel',duration:4000})
          console.log(res);
          let user = res['payload']['user_data'];
          localStorage.setItem('access_token', JSON.stringify(user['access_token']));
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/admin']);
        },
        (err: Error) => {
          this.toast.error({detail:'Error Occur', summary:'Please Provide a valid information',duration:4000})
        }
      );
    }
  }

  ngOnInit(): void {
  if(this.auth.isLoggedIn()){
    this.router.navigate(['admin'])
    }
  }

}
