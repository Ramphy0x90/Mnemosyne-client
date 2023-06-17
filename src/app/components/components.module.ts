import { NgModule } from "@angular/core";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ActionsMenuComponent } from "./cloud/actions-menu/actions-menu.component";

@NgModule({
	declarations: [NavBarComponent, ActionsMenuComponent],
	imports: [CommonModule, RouterModule],
	exports: [NavBarComponent, ActionsMenuComponent],
})
export class ComponentsModule {}
