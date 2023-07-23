import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contactlist: any;

  constructor(private alertCtrl: AlertController) {
    this.contactlist = [{
      id: 1,
      contactname: "Dang",
      number: "0879455456",
      country: "https://img.icons8.com/color/48/thailand-circular.png"
    },
    {
      id: 2,
      contactname: "Peter Kim",
      number: "0879455656",
      country: "https://img.icons8.com/fluency/48/north-korea-circular.png"
    },
    {
      id: 3,
      contactname: "SuSee",
      number: "0879444656",
      country: "https://img.icons8.com/color/48/laos-circular.png"
    }
    ];
  }
  ngOnInit() {
  }

  async showedit(item: any) {
    let alert = this.alertCtrl.create({
      header: 'Edit',
      subHeader: 'Fill the form',
      inputs: [
        {
          name: 'username',
          placeholder: 'contactname',
          value: item.contactname
        },
        {
          name: 'number',
          placeholder: 'Number',
          value: item.number
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            for (let i = 0; i < (this.contactlist.length); i++)
              if (this.contactlist[i] === item) {
                this.contactlist[i].contactname = data.username;
                this.contactlist[i].number = data.number;

              }
          }
        }
        
      ]
    });
    (await alert).present();
  }
  delete(item: any) {

    let index = this.contactlist.indexOf(item);

    if (index > -1) {
      this.contactlist.splice(index, 1);
    }
  }
}
