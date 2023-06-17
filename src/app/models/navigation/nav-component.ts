import { NavOption } from "src/app/constants";

export interface NavComponent {
	id: NavOption;
	name: string;
	route: string | null;
	accessMembers?: any[];
}
