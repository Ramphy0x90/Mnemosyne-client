import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthTokenData } from "src/app/models/auth/auth-token-data";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-test",
	templateUrl: "./test.component.html",
	styleUrls: ["./test.component.css"],
})
export class TestComponent implements OnInit {
	userData?: AuthTokenData;

	constructor(
		private authService: AuthService,
		private jwtHelperService: JwtHelperService
	) {}

	ngOnInit(): void {
		let token: string | null = this.authService.getUserToken();

		if (token) {
			let tokenDecoded = this.jwtHelperService.decodeToken(token);

			this.userData = {
				username: tokenDecoded.sub,
				authorities: tokenDecoded.authorities,
			};
		}
	}
}
