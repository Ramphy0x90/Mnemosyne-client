import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from "@angular/core";
import { FileInfo } from "src/app/models/cloud/file-info";

@Component({
	selector: "app-item-card",
	templateUrl: "./item-card.component.html",
	styleUrls: ["./item-card.component.css"],
})
export class ItemCardComponent implements OnChanges {
	@Input() file?: FileInfo;
	@Input() showSelector: boolean = false;

	@Output() selected = new EventEmitter<boolean>();

	isSelected: boolean = false;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["showSelector"]) {
			this.isSelected = false;
		}
	}

	onSelect(): void {
		this.isSelected = !this.isSelected;
		this.selected.emit(this.isSelected);
	}
}
