import { IComment } from "./IComment"

export interface ResponseComment {
	count: number
	rows: IComment[]
}
