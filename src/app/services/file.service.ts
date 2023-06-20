import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class FileService {
	constructor(private httpClient: HttpClient) {}

	upload(file: File): Observable<any> {
		const fileForm = new FormData();
		fileForm.append("file", file);

		const upload = this.httpClient.post(
			`${environment.server}/file/upload`,
			fileForm,
			{
				reportProgress: true,
				responseType: "json",
			}
		);

		return upload;
	}

	getFile(id: string): Observable<any> {
		return this.httpClient.get(`${environment.server}/file/${id}`);
	}

	getFiles(): Observable<any> {
		return this.httpClient.get(`${environment.server}/file/all`);
	}
}
