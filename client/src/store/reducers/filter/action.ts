import { setMaxPrice, setMinPrice } from "."
import { AppDispatch } from "../.."
import { $host } from "../../../http"

export const getPrice = (categoryId: number, search: string) => 
  async (dispatch: AppDispatch) => {
		try {
			const response = await $host.get(`/device/price`, {
				params: { categoryId, search },
			})
      dispatch(setMinPrice(response.data.min))
      dispatch(setMaxPrice(response.data.max))
		} catch (err) {
			console.log(err)
		}
	}
