import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { RouteTransitionAnimations } from "./route-transition-animations";
import { AuthService } from "./services/auth.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	animations: [RouteTransitionAnimations],
})
export class AppComponent implements OnInit {
	title = "Mnemosyne_client";

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.recoverAuthStatus();
	}

	prepareRoute(outlet: RouterOutlet) {
		return (
			outlet &&
			outlet.activatedRouteData &&
			outlet.activatedRouteData["animationState"]
		);
	}
}
