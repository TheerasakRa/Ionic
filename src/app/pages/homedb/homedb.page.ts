import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerData, HomeCrudService } from './HomeCrudService.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-homedb',
  templateUrl: './homedb.page.html',
  styleUrls: ['./homedb.page.scss'],
})
export class HomedbPage implements OnInit {
  datalist: CustomerData[] = [];

  constructor(private dataService: HomeCrudService,
    private modalCtrl: ModalController,
    private cd: ChangeDetectorRef, private alertController: AlertController,
    private alertCtrl: AlertController) {
    this.dataService.loadAllData().subscribe(res => {
      this.datalist = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
  }
  async addData() {
    const alert = await this.alertController.create({
      header: 'Add Data',
      inputs: [
        {
          name: 'fullname',
          type: 'text',
          placeholder: 'Enter fullname'
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Enter price'
        },
        {
          name: 'telno',
          type: 'tel',
          placeholder: 'Enter telno'
        },
        {
          name: 'isPostPaid',
          type: 'radio',
          placeholder: 'Enter ispostpaid'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            const isPostPaid = data.isPostPaid === "on"
            const CustomerData: CustomerData = {
              fullname: data.fullname,
              ispostpaid: isPostPaid,
              price: parseInt(data.price),
              telno: data.telno
            };
            this.dataService.createData(CustomerData)
            // Handle the entered data here
            console.log('Entered data:', data.data);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteData(customer: CustomerData) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete ${customer.fullname}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.dataService.deletedata(customer).then(() => {
              this.datalist = this.datalist.filter(item => item.id !== customer.id);
              this.cd.detectChanges();
            }).catch(error => {
              console.error('Error deleting document:', error);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async updateData(customer: CustomerData) {
    const alert = await this.alertController.create({
      header: 'Update Data',
      inputs: [
        {
          name: 'fullname',
          type: 'text',
          placeholder: 'Enter fullname',
          value: customer.fullname ,
          min: 1,
          max: 10
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Enter price',
          value: customer.price.toString() 
        },
        {
          name: 'telno',
          type: 'tel',
          placeholder: 'Enter telno',
          value: customer.telno
        },
        {
          name: 'isPostPaid',
          type: 'radio',
          placeholder: 'Enter ispostpaid'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (data) => {
            const isPostPaid = data.isPostPaid === "on"
            const updatedData: CustomerData = {
              id: customer.id,
              fullname: data.fullname,
              ispostpaid: isPostPaid,
              price: parseFloat(data.price),
              telno: data.telno
            };
            this.dataService.updateData(updatedData)
              .then(() => {
                // Data updated successfully
              })
              .catch(error => {
                console.error('Error updating data:', error);
              });
          }
        }
      ]
    });
    await alert.present();
  }
}
