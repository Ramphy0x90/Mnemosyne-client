import { DOCUMENT } from "@angular/common";
import {
	AfterViewInit,
	Component,
	ElementRef,
	Inject,
	OnInit,
	ViewChild,
} from "@angular/core";
import { LegendPosition } from "@swimlane/ngx-charts";
import { fromEvent } from "rxjs";
import { CloudMenuAction } from "src/app/constants";
import { FileInfo } from "src/app/models/cloud/file-info";
import { FileService } from "src/app/services/file.service";
import * as _ from "lodash";

@Component({
	selector: "app-cloud",
	templateUrl: "./cloud.component.html",
	styleUrls: ["./cloud.component.css"],
})
export class CloudComponent implements OnInit, AfterViewInit {
	@ViewChild("cloudContainer") cloudContainer!: ElementRef;

	files: FileInfo[] = [];
	filesSize: number = 0;
	fileOnFocus?: FileInfo;
	selectedFiles: Set<FileInfo> = new Set();
	showFileSelectors: boolean = false;

	dataPC: { name: string; value: number }[] = [];
	viewPC: [number, number] = [250, 250];
	animationPC = false;
	colorSchemePC = "vivid";
	labelsPC = false;
	doughnut = true;
	legendPosition = LegendPosition.Below;
	explodeSlices = true;

	constructor(
		private fileService: FileService,
		@Inject(DOCUMENT) private document: Document
	) {}

	ngOnInit(): void {
		this.fetchFiles();
	}

	ngAfterViewInit(): void {
		fromEvent(this.cloudContainer.nativeElement, "click").subscribe(
			(event: any) => {
				const element: HTMLElement = event.target;
				const item: HTMLElement | null =
					this.document.querySelector("app-item-card");

				if (element.parentElement?.contains(item)) {
					this.fileOnFocus = undefined;
				}
			}
		);
	}

	eventHandler(event: CloudMenuAction): void {
		switch (event) {
			case CloudMenuAction.UPLOAD:
				this.fetchFiles();
				break;
			case CloudMenuAction.EDIT:
				this.showFileSelectors = true;
				this.fileOnFocus = undefined;
				break;
			case CloudMenuAction.DELETE:
				this.deleteFiles();
				this.showFileSelectors = false;
				this.fileOnFocus = undefined;
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

				let categoryCount = _.countBy(this.files, (file) => file.ext);
				let finalMap: { name: string; value: number }[] = [];

				_.keys(categoryCount).forEach((category) => {
					finalMap.push({
						name: category,
						value: categoryCount[category],
					});
				});

				this.dataPC = [...finalMap];
			},
		});
	}

	deleteFiles(): void {
		if (this.selectedFiles.size > 0) {
			let fileNames: string[] = [];

			this.selectedFiles.forEach((file) => {
				fileNames.push(file.name);
			});

			this.fileService.deleteFiles(fileNames).subscribe(() => {
				this.fetchFiles();
			});
		}
	}

	getSizeSelectedFiles(): number {
		let total: number = 0;

		this.selectedFiles.forEach((element) => {
			total += element.size;
		});

		return total;
	}

	selectFile(isSelected: boolean, file: FileInfo): void {
		if (this.showFileSelectors) {
			if (isSelected) {
				this.selectedFiles.add(file);
			} else {
				this.selectedFiles.delete(file);
			}
		} else {
			this.fileOnFocus = file;
			this.fileService
				.getFile(this.fileOnFocus?.name)
				.subscribe((file: Blob) => {
					const blob = new Blob([file], {
						type: file.type.toString(),
					});
					const url = window.URL.createObjectURL(blob);
					const imgContainer: HTMLElement | null =
						this.document.querySelector(".slot-img");
					imgContainer?.style.setProperty(
						"background-image",
						`url(${url})`
					);

					this.document
						.querySelector(".slot-download")
						?.setAttribute("href", url);
				});
		}
	}
}
