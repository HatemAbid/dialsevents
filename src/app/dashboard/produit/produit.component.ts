import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/repository.service';
import { MatTableDataSource } from '@angular/material';
import { Produit } from './../../shared/produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: Produit[] = [];

  public displayedColumns = ['name'];
  //public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Produit>();
 
  constructor(private repoService: RepositoryService) { }
 
  ngOnInit() {
    this.getAllOwners();
  }
 
  public getAllOwners = () => {
    this.repoService.getData('/www2/produits.php')
    .subscribe(res => {
      this.dataSource.data = res as Produit[];
    })
  }
 
  public redirectToDetails = (id: string) => {
    
  }
 
  public redirectToUpdate = (id: string) => {
    
  }
 
  public redirectToDelete = (id: string) => {
    
  }
 
}