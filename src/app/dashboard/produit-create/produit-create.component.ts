import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Produit } from './../../shared/produit';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produit-create',
  templateUrl: './produit-create.component.html',
  styleUrls: ['./produit-create.component.css']
})
export class ProduitCreateComponent implements OnInit {public produitForm: FormGroup;

  constructor(private location: Location, private repoService: RepositoryService) { }

  ngOnInit() {

    this.produitForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.produitForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    this.location.back();
  }
 
  public createProduit = (produitFormValue) => {
    if (this.produitForm.valid) {
      this.executeOwnerCreation(produitFormValue);
    }
  }
 
  private executeOwnerCreation = (produitFormValue) => {
    let produit: Produit = {
      name: produitFormValue.name,
      //dateOfBirth: ownerFormValue.dateOfBirth,
      //description: ownerFormValue.address
    }
 
    let apiUrl = '/www2/produits.php';
    this.repoService.create(apiUrl, produit)
      .subscribe(res => {
        //this is temporary, until we create our dialogs
        this.location.back();
      },
      (error => {
        //temporary as well
        this.location.back();
      })
    )
  }

}