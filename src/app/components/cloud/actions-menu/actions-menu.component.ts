import { HttpEventType } from "@angular/common/http";
import {
	Component,
	ElementRef,
	Output,
	ViewChild,
	EventEmitter,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CloudMenuAction } from "src/app/constants";
import { MenuAction } from "src/app/models/navigation/menu-action";
import { FileService } from "src/app/services/file.service";

@Component({
	selector: "app-actions-menu",
	templateUrl: "./actions-menu.component.html",
	styleUrls: ["./actions-menu.component.css"],
})
export class ActionsMenuComponent {
	@ViewChild("modal") modal?: ElementRef;
	@Output() event = new EventEmitter<CloudMenuAction>();

	CloudMenuAction = CloudMenuAction;
	showActionsNames: boolean = false;
	lastAction?: MenuAction;

	navOptions: MenuAction[] = [
		{
			id: CloudMenuAction.UPLOAD,
			name: "Upload file",
			icon: "bi bi-cloud-upload",
			type: "button",
			showOnEdit: false,
			usesModal: true,
			action: () => this.upload(),
		},
		{
			id: CloudMenuAction.CREATE,
			name: "Create folder",
			icon: "bi bi-folder-plus",
			type: "action",
			showOnEdit: false,
			usesModal: true,
			action: () => this.createFolder(),
		},
		{
			id: CloudMenuAction.EDIT,
			name: "Edit",
			icon: "bi bi-pencil-square",
			type: "action",
			showOnEdit: false,
			usesModal: false,
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
			showOnEdit: true,
			usesModal: false,
			action: () => {
				this.onEdit = false;
				this.event.emit(CloudMenuAction.DELETE);
			},
		},
		{
			id: CloudMenuAction.CANCEL,
			name: "Cancel",
			icon: "bi bi-x-square",
			type: "action",
			showOnEdit: true,
			usesModal: false,
			action: () => {
				this.onEdit = false;
				this.event.emit(CloudMenuAction.CANCEL);
			},
		},
	];

	onEdit: boolean = false;
	onUpload: boolean = false;
	uploadProgress: number = 0;

	selectedFiles?: FileList;
	createFolderName?: string;

	requestMessage?: string;

	constructor(
		private fileService: FileService,
		private route: ActivatedRoute
	) {}

	onFileSelected(event: any): void {
		this.selectedFiles = event.target.files;
	}

	upload(): void {
		const currentPath = this.route.snapshot.paramMap.get("path") || "/";
		this.uploadProgress = 0;

		if (this.selectedFiles) {
			for (let index = 0; index < this.selectedFiles?.length; index++) {
				const file = this.selectedFiles.item(index);

				if (file) {
					this.onUpload = true;
					this.fileService.upload(currentPath, file).subscribe({
						next: (event) => {
							if (event.type === HttpEventType.UploadProgress) {
								this.uploadProgress = Math.round(
									(100 * event.loaded) / (event.total || 1)
								);
							} else {
								this.requestMessage = event.message;
							}

							if (this.modal) {
								const modalInput =
									this.modal.nativeElement.querySelector(
										"input[type='file']"
									);
								const modalCloseButton =
									this.modal.nativeElement.querySelector(
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

	createFolder(): void {
		if (this.createFolderName) {
			const currentPath = this.route.snapshot.paramMap.get("path") || "/";

			this.fileService
				.create(currentPath, this.createFolderName)
				.subscribe(() => {
					const modalCloseButton =
						this.modal?.nativeElement.querySelector(
							"button.close-modal"
						);

					this.createFolderName = undefined;
					modalCloseButton.click();
					this.event.emit(CloudMenuAction.CREATE);
				});
		}
	}

	selectAction(action: MenuAction): void {
		this.lastAction = action;
	}

	submit(): void {
		this.lastAction?.action && this.lastAction.action();
	}
}
