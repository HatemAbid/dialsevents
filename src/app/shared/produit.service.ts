import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Produit } from '../shared/produit';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({ providedIn: 'root' })
export class ProduitServicesService {
  //private produitsUrl = 'http://196.234.199.124/test/produits.php';  // URL to web api
  private produitsUrl =
    'https://www.cartemenu.tn/dialsevents/www2/produits.php'; // URL to web api

  //private produitsUrl = 'https://jsonplaceholder.typicode.com/posts';  // URL to web api

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}

  /** GET Produits from the server */
  getProduits(): Observable<Produit[]> {
    console.log('Message : ' + this.produitsUrl);
    return this.http.get<Produit[]>(this.produitsUrl).pipe(
      tap((_) => console.log('fetched produit')),
      catchError(this.handleError('getProduits', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addProduit(produit: Produit): Observable<Produit> {
    console.log('Produit  : ' + JSON.stringify(produit));
    console.log('httpOptions  : ' + httpOptions);
    console.log('http  : ' + this.http);
    return this.http
      .post<Produit>(this.produitsUrl, produit, httpOptions)
      .pipe(catchError(this.handleError('addProduit', produit)));
  }

  /** PUT: update the hero on the server */
  updateProduit(produit: Produit): Observable<any> {
    return this.http.put(this.produitsUrl, produit, httpOptions).pipe(
      tap((_) => console.log(`updated hero id=${produit.id}`)),
      catchError(this.handleError<any>('updateProduit'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteProduit(prod: Produit | number): Observable<Produit> {
    const id = typeof prod === 'number' ? prod : prod.id;
    const url = `${this.produitsUrl}?id=${id}`;
    console.log('id  : ' + id);
    console.log('url  : ' + url);
    return this.http.delete<Produit>(url, httpOptions).pipe(
      tap((_) => console.log(this.produitsUrl)),
      catchError(this.handleError<Produit>('deleteProduit'))
    );
  }
}
