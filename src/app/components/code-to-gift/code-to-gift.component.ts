import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-code-to-gift',
  templateUrl: './code-to-gift.component.html',
  styleUrls: ['./code-to-gift.component.css']
})
export class CodeToGiftComponent implements OnInit {

  public logo = '';
  public tel: string = '';
  public inputLogo = '';
  operator: string = '';
  selectedPromo = '';
  operatorUrl: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  cols = [
    { a: '100 MO' },
    { a: '100 SMS' },
    { a: '200 MO social media' },
    { a: '15 MIN' },
  ]


  getMarque(form: NgForm) {
    switch (form.value.code) {
      case '1': this.logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/1488px-Pepsi_logo_2014.svg.png'
        break;
      case '2': this.logo = 'https://www.casa24.ma/up/uploads/7419db8.png'
        break;

      default: this.logo = '';
        break;
    }
  }

  getOperatorImage(operatorUrl: string) {
    switch (operatorUrl) {
      case 'orange': this.operatorUrl = 'https://www.kpulse.fr/public/images/integrations/orange-logo.png'
        break;
      case 'inwi': this.operatorUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Logo_inwi.svg/2560px-Logo_inwi.svg.png'
        break;

      case 'telecom': this.operatorUrl = 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/6e/Maroc_telecom_logo.svg/1200px-Maroc_telecom_logo.svg.png'
        break;

      case 'onePay': this.operatorUrl = 'https://static.wixstatic.com/media/4cb13b_eac899609dfd47fc96884595c4430489~mv2.png/v1/fill/w_434,h_118,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/onepaylogocolored%20(1).png'
        break;

      default: this.logo = '';
        break;
    }
  }

  // confirm(form : NgForm) {
  //   Swal.fire({
  //     title: 'Confirmation',
  //     html: '<div><b>veuillez choisir la promotion:</b></div>' +
  //       '<select id="swal-input1" class="swal2-input">' +
  //       this.cols.map(e => {
  //         return '<option value="' + e.a + '">' + e.a + '</option>'
  //       }) +
  //       '</select> <br><br>' +
  //       '<div><b>Veuillez entre votre num de télé:</b><br></div>' +
  //       '<input placeholder="06xxxxxxxx" id="swal-input2" class="swal2-input">',
  //     imageUrl: imageUrl,
  //     imageWidth: 400,
  //     imageHeight: 200,
  //     imageAlt: 'Custom image',
  //     showDenyButton: true,
  //     showCancelButton: true,
  //   }).then((result => {
  //     if (result.isConfirmed) {
  //       const promo = document.getElementById('swal-input1') as HTMLInputElement
  //       const userPhone = document.getElementById('swal-input2') as HTMLInputElement
  //       console.log(promo.value)
  //       console.log(userPhone.value)
  //       Swal.fire('Operation bien effectuée', '', 'success');
  //       this.logo = '';
  //       this.inputLogo = '';
  //       this.tel = '';
  //     } else if (result.isDenied) {
  //       Swal.fire('transaction annulée', '', 'warning')
  //     }
  //   }))

  // }

  confirm(form: NgForm) {
    if (this.operator == 'onePay') {
      this.onePay();
      this.logo = '';
      this.inputLogo = '';
      this.tel = '';
      this.operator = ''
      return
    }

    Swal.fire({
      title: 'Confirmation',
      html: '<b>Bénéficiaire:</b> ' + this.tel + ' <br>' +
        '<b>Promo:</b> ' + this.selectedPromo + '<br><br>',
      imageUrl: this.operatorUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showDenyButton: true,
      showCancelButton: true,
    }).then((result => {
      if (result.isConfirmed) {
        Swal.fire('Operation bien effectuée', '', 'success');
        this.logo = '';
        this.inputLogo = '';
        this.tel = '';
        this.operator = '';
        form.reset();
      } else if (result.isDenied) {
        Swal.fire('transaction annulée', '', 'warning')
      }
    }))
  }


  onePay() {
    Swal.fire({
      title: 'Confirmation',
      html: '<p>OnePay vous offre x points de fidélité pour bénéficier d\'autres cadeaux (Jeux, TV, Apps..)</p><a href="https://play.google.com/store/apps/details?id=com.one1pay.sispay&gl=MA" target="_blank">Download OnePay <i class="fa-brands fa-google-play"></i></a><br><br>',
      imageUrl: this.operatorUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showDenyButton: true,
      showCancelButton: true,
    }).then((result => {
      if (result.isConfirmed) {
        Swal.fire('Vous avez gagné 15 points de fédilité sur votre compte OnePay', '', 'success');
        this.logo = '';
        this.inputLogo = '';
        this.tel = '';
      } else if (result.isDenied) {
        Swal.fire('Transaction annulée', '', 'info')
      }
    }))

  }

  onSelectOperator(operator: string, $event: any) {
    this.operator = operator
    this.getOperatorImage(operator)
    console.log(operator);

    $(".active").removeClass("active");
    $($event.currentTarget).addClass("active");
  }

}
