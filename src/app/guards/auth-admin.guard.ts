import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthState } from "../constants";
import { AuthService } from "../services/auth.service";

@Injectable({
	providedIn: "root",
})
export class AuthAdminGuard {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (this.authService.getUserAuthStatus() != AuthState.AUTHENTICATED) {
			this.router.navigate(["log-in"]);
			return false;
		}

		return true;
	}
}
