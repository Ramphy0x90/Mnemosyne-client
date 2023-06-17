import { CloudMenuAction } from "src/app/constants";

export interface MenuAction {
	id: CloudMenuAction;
	name: string;
	icon?: string;
	action: Function;
}
