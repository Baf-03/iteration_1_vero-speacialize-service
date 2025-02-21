import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class NonLoggedInGuard implements CanActivate {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const usr = this.localStorageService.getUser();
    if (usr) {
      this.router.navigate(['/']);
      return true;
    }
    return true;
  }
}
