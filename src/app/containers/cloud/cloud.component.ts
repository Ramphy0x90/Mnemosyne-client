import { Component, OnInit } from "@angular/core";
import { CloudMenuAction } from "src/app/constants";
import { FileInfo } from "src/app/models/cloud/file-info";
import { FileService } from "src/app/services/file.service";

@Component({
	selector: "app-cloud",
	templateUrl: "./cloud.component.html",
	styleUrls: ["./cloud.component.css"],
})
export class CloudComponent implements OnInit {
	files: FileInfo[] = [];
	filesSize: number = 0;
	selectedFiles: Set<any> = new Set();
	showFileSelectors: boolean = false;

	constructor(private fileService: FileService) {}

	ngOnInit(): void {
		this.fetchFiles();
	}

	eventHandler(event: CloudMenuAction): void {
		switch (event) {
			case CloudMenuAction.UPLOAD:
				this.fetchFiles();
				break;
			case CloudMenuAction.EDIT:
				this.showFileSelectors = true;
				break;
			case CloudMenuAction.CANCEL:
				this.showFileSelectors = false;
				this.selectedFiles.clear();
				break;
		}
	}

	fetchFiles(): void {
		this.fileService.getFiles().subscribe({
			next: (data) => {
				this.files = data.files;
				this.filesSize = data.size;
			},
		});
	}

	selectFile(isSelected: boolean, file: any): void {
		if (isSelected) {
			this.selectedFiles.add(file.name);
		} else {
			this.selectedFiles.delete(file.name);
		}
	}
}
