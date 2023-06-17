import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogInComponent } from "./containers/log-in/log-in.component";
import { SignUpComponent } from "./containers/sign-up/sign-up.component";
import { TestComponent } from "./containers/dev/test/test.component";
import { AuthAdminGuard } from "./guards/auth-admin.guard";
import { CloudComponent } from "./containers/cloud/cloud.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "home" },
	{ path: "log-in", component: LogInComponent },
	{ path: "sign-up", component: SignUpComponent },
	{ path: "cloud", component: CloudComponent, canActivate: [AuthGuard] },
	{
		path: "dev",
		canActivate: [AuthAdminGuard],
		children: [{ path: "test", component: TestComponent }],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
