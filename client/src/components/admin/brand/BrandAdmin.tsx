import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux"
import { useAppDispatch } from "./../../../hooks/redux"
import { createBrand, deleteBrand, getBrands, updateBrand } from "./../../../store/reducers/brand/action"
import { roleChecking } from "./../../../utils/roleChecking"
import Confirm from "./../../UI/confirm/Confirm"
import Input from "./../../UI/input/Input"
import OrangeButton from "./../../UI/orangeButton/OrangeButton"
import RedButton from "./../../UI/redButton/RedButton"
import Select from "./../../UI/select/Select"
import st from "./BrandAdmin.module.scss"

const BrandAdmin = () => {
	const { route } = useAppSelector(state => state.adminReducer)
	const { categories } = useAppSelector(state => state.categoryReducer)
	const { brands } = useAppSelector(state => state.brandReducer)
	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const [categoryId, setCategoryId] = useState(0)
	const [brandId, setBrandId] = useState(0)
	const [brandName, setBrandName] = useState(``)
	const [createName, setCreateName] = useState(``)
	const [visibleBrand, setVisibleBrand] = useState(false)
	const [visibleConfirmDeleteBrand, setVisibleConfirmBrand] = useState(false)

	const [access, setAccess] = useState(false)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		setAccess(roleChecking(["admin"], currentUser))
	}, [])

	useEffect(() => {
		if (categoryId !== undefined) {
			dispatch(getBrands(categoryId))
		}
	}, [categoryId])

	const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategoryId(Number(e.target.value))
		setVisible(true)
	}

	const changeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setBrandId(Number(e.target.value))
		setVisibleBrand(true)
	}

	const createNewBrand = () => {
		if (createName.length >= 2 && categoryId) {
			dispatch(createBrand(categoryId, createName))
			setCreateName(``)
		}
	}

	const update = () => {
		if (brandName.length >= 2 && brandId !== 0) {
			dispatch(updateBrand(brandId, brandName))
			setBrandName(``)
		}
	}

	const destroyVisible = () => {
		setVisibleConfirmBrand(true)
	}

	const yes = () => {
		if (brandId) {
			dispatch(deleteBrand(brandId))
			setVisibleConfirmBrand(false)
		}
	}

	const no = () => {
		setVisibleConfirmBrand(false)
	}

	return route === `brand` ? (
		access ? (
			<div className={st.brand}>
				<h1 className={st.main_title}>Бренды</h1>
				<h5 className={st.title}>Выбрать категорию</h5>
				<Select data={categories} func={changeCategory} />
				{visible && (
					<>
						<div className={st.create}>
							<h5 className={st.title}> Создать бренд</h5>
							<Input
								value={createName}
								setValue={setCreateName}
								placeholder="Новый бренд..."
							/>
							<OrangeButton click={createNewBrand}>Создать</OrangeButton>
						</div>
						<h5 className={st.title}>Выбрать бренд</h5>
						<Select data={brands} func={changeBrand} />
						{visibleBrand && (
							<>
								<h5 className={st.title}>Новое наименование</h5>
								<div className={st.update}>
									<Input
										value={brandName}
										setValue={setBrandName}
										placeholder="Название бренда..."
									/>
									<div className={st.btns}>
										<RedButton click={destroyVisible}>Удалить бренд</RedButton>
										<OrangeButton click={update}>Сохранить</OrangeButton>
									</div>
									{visibleConfirmDeleteBrand && <Confirm yes={yes} no={no} />}
								</div>
							</>
						)}
					</>
				)}
			</div>
		) : (
			<h1 className={st.access}>Недостаточно прав для доступа</h1>
		)
	) : (
		<></>
	)
}

export default BrandAdmin
