import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { ContainersModule } from "./containers/containers.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from "ngx-toastr";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { ErrorHandlerInterceptor } from "./interceptors/error-handler.interceptor";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "./store/user/user.reducer";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ContainersModule,
		ComponentsModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter,
			},
		}),
		ToastrModule.forRoot({
			timeOut: 4500,
			positionClass: "toast-top-right",
			preventDuplicates: true,
			progressBar: true,
		}),
		StoreModule.forRoot(
			{
				user: userReducer,
			},
			{}
		),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorHandlerInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

export function tokenGetter(): string | null {
	return localStorage.getItem("token");
}
