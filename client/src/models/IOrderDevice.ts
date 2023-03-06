export interface IOrderDevice {
	id: number
	device: Device
}

interface Device {
	id: number
	name: string
	price: number
	img: string
}
