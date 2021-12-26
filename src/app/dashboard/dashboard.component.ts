import { Component, Input, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Produit } from '../shared/produit';
import { Router } from "@angular/router";
import { ProduitServicesService } from '../shared/produit.service';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
    displayedColumns: string[] = ['id', 'name', 'update', 'delete'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };
  produits: Produit[] = [];
  editProduit: Produit; // the hero currently being edited
   //@Input() editProduit1: Produit;
@Input() produit: Produit;
currentUser: User;
currentUserSubscription: Subscription;

  //constructor(private produitServicesService: ProduitServicesService,private router: Router) { }
  constructor(
  private produitServicesService: ProduitServicesService, 
  private authenticationService: AuthenticationService,
   private router: Router,
   //private userService: UserService
  
  ) 
  { 
  
	// redirect to home if already logged in
	if (!this.authenticationService.currentUserValue) { 
		this.router.navigate(['/login']);
	}
	
	this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
  }

  ngOnInit() {
    this.get();
    //this.dataSource.paginator = this.paginator;
   // console.log("Produit is : "+ JSON.stringify(this.produits));
   //this.dataSource.sort = this.sort;
   //this.dataSource.paginator = this.paginator;
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  get(): void {
    this.produitServicesService.getProduits()
      .subscribe(produits => this.dataSource.data = produits);  
  }

  add(name: string): void {
    this.editProduit = undefined;
    name = name.trim();
    if (!name) {
      return;
    }
    console.log("Name is : "+ name + " --" );

    // The server will generate the id for this new hero
    const newProduit: Produit = { name } as Produit;
    console.log("newProduit is : "+ JSON.stringify(newProduit));
    this.produitServicesService
      .addProduit(newProduit)
      .subscribe(
		  produit => this.produits.push(newProduit)
      );
  }
  
  delete(produit: Produit): void {
    this.produits = this.produits.filter(h => h !== produit);
    this.produitServicesService.deleteProduit(produit).subscribe();
  }
  
  save1(name: string): void {
	  const editProduit: Produit = { id:1, name } as Produit;
	  console.log("editProduit is : "+ JSON.stringify(editProduit));
    this.produitServicesService.updateProduit(editProduit)
      .subscribe();
  }
  
  save(editProduit: Produit): void {
	 // const editProduit: Produit = { id:1, name } as Produit;
	  //const editProduit: Produit = produit;
	  //this.editProduit=produit;
	  console.log("editProduit is : "+ JSON.stringify(editProduit));
    this.produitServicesService.updateProduit(editProduit)
      .subscribe();
  }
  
  modifier(produit: Produit): void {
	  //this.produitServicesService.deleteProduit(produit).subscribe();
	  //console.log("edit Produit 1 is : "+ JSON.stringify(this.editProduit1));
	 // this.editProduit.name = produitName.value;
	  console.log("edit Produit is : "+ JSON.stringify(produit));
	  this.editProduit=produit;
	  //this.editProduit.name = "modifier";
	  //this.produitName.value="aqw";
	  //this.produitName.value=produit.name;
	  //this.produitName.value ="aa";
	  //this.produits = this.produits.filter(h => h !== produit);
   /* this.editProduit = undefined;
    name = name.trim();
    if (!name) {
      return;
    }
    console.log("Name is : "+ name + " --" );

    // The server will generate the id for this new hero
    const newProduit: Produit = { name } as Produit;
    console.log("newProduit is : "+ JSON.stringify(newProduit));
    this.produitServicesService
      .addProduit(newProduit)
      .subscribe(
		  produit => this.produits.push(newProduit)
      );*/
	  
	  //this = "testHA";
  }

}