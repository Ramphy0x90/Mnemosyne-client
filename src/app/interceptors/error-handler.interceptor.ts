import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private toastr: ToastrService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				let msg: string;

				if (!error.ok && error.status == 0) {
					msg = `${error.statusText}`;
				} else if (error.error.message != undefined) {
					msg = `${error.error.message}`;
				} else if (error.error != undefined) {
					msg = msg = `${error.error}`;
				} else {
					msg = msg = `${error.error.error}`;
				}

				this.toastr.error(msg);
				return throwError(() => msg);
			})
		);
	}
}
