import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { UIService } from 'src/app/Services/UI/ui.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-add-user-to-family',
  templateUrl: './add-user-to-family.component.html',
  styleUrls: ['./add-user-to-family.component.css']
})
export class AddUserToFamilyComponent {

  public submitting = false; //for when submitting the form

  public firstName: string = "";
  public userName: string = "";
  public password: string = "";

  public warning: string = ""

  constructor(
    public dialogRef: MatDialogRef<AddUserToFamilyComponent>, 
    private auth: AuthenticationService,
    private ui: UIService,
    private userService: UserService,
  ) {

  }

  public submit() {

    let familyId = this.auth.currentUserValue?.familyId || 0; 

    if (!this.firstName || !this.userName || !this.password) {
      this.warning = "All fields are required";
    } else if (this.userName.length < 5) {
      this.warning = "Username must be at least 5 characters long";
    } else if (this.password.length < 8) {
      this.warning = "Password must be at least 8 characters long";
    } else {

      //submit the data
      this.submitting = true; 
      this.userService.createUser({ userName: this.userName, email: "", password: this.password, firstName: this.firstName, familyId: familyId }).pipe(first()).subscribe({
        next: () => {
          //account has been created
          this.dialogRef.close();
        },
        error: err => {
          this.warning = err;
        }
      });


      this.warning = '';
    }


    
  }

  public cancel(){
    this.dialogRef.close();
  }




}
