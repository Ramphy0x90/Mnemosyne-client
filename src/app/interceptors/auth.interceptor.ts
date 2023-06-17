import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
} from "@angular/common/http";
import { EMPTY, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { AuthState } from "../constants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private authService: AuthService,
		private toastr: ToastrService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		let userAuthStatus = this.authService.getUserAuthStatus();
		let userToken = this.authService.getUserToken();

		if (userToken && userAuthStatus == AuthState.AUTHENTICATED) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${userToken}`,
				},
			});
		} else if (!userToken && userAuthStatus == AuthState.AUTHENTICATED) {
			this.toastr.error("Invalid token");
			return EMPTY;
		}

		return next.handle(request);
	}
}
