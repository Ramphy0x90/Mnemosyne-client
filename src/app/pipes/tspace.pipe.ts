import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "tspace",
})
export class TspacePipe implements PipeTransform {
	transform(value: number, unit: boolean): string {
		let mbSize = (value * 100) / 1024 / 1024;
		mbSize = Math.round(mbSize) / 100;

		return unit ? `${mbSize} MB` : mbSize.toString();
	}
}
