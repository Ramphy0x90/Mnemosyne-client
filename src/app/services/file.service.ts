import { HttpClient, HttpHeaders } from "@angular/common/http";
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

	create(name: String): Observable<any> {
		const folder = {
			name: name,
			basePath: "/",
		};

		return this.httpClient.post(
			`${environment.server}/file/create`,
			folder
		);
	}

	getFile(id: string): Observable<any> {
		return this.httpClient.get(`${environment.server}/file/${id}`, {
			responseType: "blob",
		});
	}

	getFiles(): Observable<any> {
		return this.httpClient.get(`${environment.server}/file/all`);
	}

	deleteFiles(filesIds: string[]): Observable<any> {
		const options = {
			headers: new HttpHeaders({ "Content-Type": "application/json" }),
			body: { filesNames: filesIds },
		};

		return this.httpClient.delete(
			`${environment.server}/file/delete`,
			options
		);
	}
}
