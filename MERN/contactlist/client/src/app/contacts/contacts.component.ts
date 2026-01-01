import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contacts } from '../contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts : Contacts[];
  newContact;
  trackedChanges;
  updateAllow;
  constructor(
    private contactService:ContactService
  ) { 
    this.newContact = new Contacts();
  }

  ngOnInit() {
    this.contactService.getContacts()
    .subscribe(
      (data:any)=>{
        this.newContact = new Contacts();
        this.contacts = data;
        this.updateAllow = [];
        this.trackedChanges = {};
        var i=0;
        this.contacts.forEach(data=>{
          this.updateAllow.push(false);
          this.trackedChanges[i] = data;
          i++;
        })
        // console.log("changes to be tracked in this object>>>",this.trackedChanges);
        // console.log("data from db>>>",this.contacts);
        // console.log("update data>>>",this.updateAllow);
      },
      error=>{

      }
    );
  }

  delete(id,i){
    // console.log("delete id>>>",id)
    this.contactService.deleteContact(id).subscribe(
      data=>{
        // console.log("index>>",i);
        this.contacts.splice(i,1);
        this.updateAllow.splice(i,1);
        // console.log("data from db>>>",this.contacts);
        // console.log("update Allow>>>",this.updateAllow);
      },
      error=>{
        // console.log("error deleting contact");
      }
    )
  }
  
  addContact(){
    // console.log("new contact to be added>>",this.newContact);
    this.contactService.addContact(this.newContact).subscribe(
      data=>{
        this.ngOnInit();
      },
      error=>{
        // console.log("unable to add the contact");
      }
    )
  }

  update(id,i){
    var changedData = this.trackedChanges[i];
    var newdata = {};
    newdata['first_name'] = changedData.first_name;
    newdata['last_name'] = changedData.last_name;
    newdata['phone'] = changedData.phone;
    // console.log("id>>>>",id);
    // console.log("index>>",i);
    // console.log("to be update from index>>>",changedData);
    // console.log("data ready to update>>>",newdata);
    this.contactService.updateContact(id,newdata).subscribe(
      data=>{
        // console.log("data updated successfully");
      },
      error=>{
        // console.log("error in updating the data in the database");
      }
    );
    // console.log("tracked changes>>",this.trackedChanges);
    // console.log("table contents>>>",this.contacts);
    this.updateAllow[i] = false;
  }

  check(i){
    return this.updateAllow[i];
  }

  allowChange(event, i, col_name){
    var eventValue = event.target.innerText;
    var content = this.contacts[i];
    // as we update the value in content the value in this.contacts[i] also gets updated due
    // to pass by reference in objects
    if(col_name == "first_name"){
      if(content["first_name"] !== eventValue){        
        this.trackedChanges[i]['first_name'] = eventValue;
        this.updateAllow[i] = true;
      }
    }
    if(col_name == "last_name"){
      if(content['last_name'] != eventValue){
        this.trackedChanges[i]['last_name'] = eventValue;
        this.updateAllow[i] = true;
      }
    }
    if(col_name == "phone"){
      if(content['phone'] != eventValue){
        this.trackedChanges[i]['phone'] = eventValue;
        this.updateAllow[i] = true;
      }
    }
    // console.log("update allow>>",this.updateAllow);
    // console.log("changed data>>>",this.contacts[i]);
    // console.log("changes tracked till now>>>",this.trackedChanges);
  }

  
  

}
