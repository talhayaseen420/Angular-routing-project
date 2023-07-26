import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm:FormGroup;
  fp:any;
  errorMessage:string = null || '';

  constructor(private fb:FormBuilder,private auth:AuthenticationService, private toast:NgToastService, private router:Router) {
    this.forgotForm = this.fb.group({
      email:['']
    })
  }

  ngOnInit(): void {
  }

  submitting(){
    this.auth.forgotPassword(this.forgotForm.value).subscribe(res=>{
      this.toast.success({
        detail:'Success',
        summary:'Reset code send to the email'
      })
      console.log(res)
      this.fp = res
      this.router.navigate(['/login'])

    },err=>{
      this.toast.error({
        detail:'Error',
        summary:this.errorMessage = err.statusText
      })
      this.router.navigate(['/login'])
    })
    }
  }


