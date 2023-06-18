import { HttpEventType } from "@angular/common/http";
import {
	Component,
	ElementRef,
	Output,
	ViewChild,
	EventEmitter,
} from "@angular/core";
import { CloudMenuAction } from "src/app/constants";
import { MenuAction } from "src/app/models/navigation/menu-action";
import { FileService } from "src/app/services/file.service";

@Component({
	selector: "app-actions-menu",
	templateUrl: "./actions-menu.component.html",
	styleUrls: ["./actions-menu.component.css"],
})
export class ActionsMenuComponent {
	@ViewChild("uploadModal") uploadModal?: ElementRef;
	@Output() event = new EventEmitter<CloudMenuAction>();

	CloudMenuAction = CloudMenuAction;
	onEdit: boolean = false;

	navOptions: MenuAction[] = [
		{
			id: CloudMenuAction.UPLOAD,
			name: "Upload",
			icon: "bi bi-cloud-arrow-up",
			type: "button",
			action: () => {},
		},
		{
			id: CloudMenuAction.EDIT,
			name: "Edit",
			icon: "bi bi-pencil-square",
			type: "action",
			action: () => {
				this.onEdit = true;
				this.event.emit(CloudMenuAction.EDIT);
			},
		},
		{
			id: CloudMenuAction.DELETE,
			name: "Delete",
			icon: "bi bi-trash3",
			type: "action",
			action: () => {
				this.onEdit = false;
				this.event.emit(CloudMenuAction.DELETE);
			},
		},
		{
			id: CloudMenuAction.CANCEL,
			name: "Cancel",
			icon: "bi bi-x",
			type: "action",
			action: () => {
				this.onEdit = false;
				this.event.emit(CloudMenuAction.CANCEL);
			},
		},
	];

	uploadProgress: number = 0;
	onUpload: boolean = false;
	selectedFiles?: FileList;
	fileInfos: object[] = [];
	requestMessage?: string;

	constructor(private fileService: FileService) {}

	onFileSelected(event: any): void {
		this.selectedFiles = event.target.files;
	}

	upload(): void {
		this.uploadProgress = 0;

		if (this.selectedFiles) {
			for (let index = 0; index < this.selectedFiles?.length; index++) {
				const file = this.selectedFiles.item(index);

				if (file) {
					this.onUpload = true;
					this.fileService.upload(file).subscribe({
						next: (event) => {
							console.log(event);
							if (event.type === HttpEventType.UploadProgress) {
								this.uploadProgress = Math.round(
									(100 * event.loaded) / (event.total || 1)
								);
							} else {
								this.requestMessage = event.message;
							}

							if (this.uploadModal) {
								const modalInput =
									this.uploadModal.nativeElement.querySelector(
										"input[type='file']"
									);
								const modalCloseButton =
									this.uploadModal.nativeElement.querySelector(
										"button.close-modal"
									);

								modalInput.value = "";
								modalCloseButton.click();
								this.event.emit(CloudMenuAction.UPLOAD);
							}
						},
						error: (err) => {
							this.uploadProgress = 0;
							this.requestMessage = err;
						},
					});
				}
			}

			this.onUpload = false;
			this.selectedFiles = undefined;
		}
	}
}
