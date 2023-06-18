import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ActionsMenuComponent } from "./actions-menu.component";

describe("ActionsMenuComponent", () => {
	let component: ActionsMenuComponent;
	let fixture: ComponentFixture<ActionsMenuComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ActionsMenuComponent],
		});
		fixture = TestBed.createComponent(ActionsMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
