import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux"
import { createCategory, deleteCategoryById, updateCategory } from "../../../store/reducers/category/action"
import { roleChecking } from "../../../utils/roleChecking"
import Confirm from "../../UI/confirm/Confirm"
import OrangeButton from "../../UI/orangeButton/OrangeButton"
import Select from "../../UI/select/Select"
import VisibleButton from "../../UI/visibleButton/VisibleButton"
import { useAppDispatch } from "./../../../hooks/redux"
import RedButton from "./../../UI/redButton/RedButton"
import st from "./CategoryAdmin.module.scss"

const CategoryAdmin = () => {
	const { route } = useAppSelector(state => state.adminReducer)
	const { categories } = useAppSelector(state => state.categoryReducer)
	const dispatch = useAppDispatch()

	const [categoryId, setCategoryId] = useState<number>(0)
	const [changeVisible, setChangeVisible] = useState(false)
	const [newValue, setNewValue] = useState(``)
	const [updateValue, setUpdateValue] = useState(``)
	const [visibleConfirmCategory, setVisibleConfirmCategory] = useState(false)

	const { currentUser } = useAppSelector(state => state.authReducer)
	const [access, setAccess] = useState(false)
	useEffect(() => {
		setAccess(roleChecking(["admin"], currentUser))
	}, [])

	const createNewCategory = () => {
		if (newValue.length > 3) {
			dispatch(createCategory(newValue))
			setNewValue(``)
		}
	}

	const update = () => {
		if (updateValue.length > 3) {
			dispatch(updateCategory(categoryId, updateValue))
			setUpdateValue(``)
		}
	}

	const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategoryId(Number(e.target.value))
		setChangeVisible(true)
	}

	const deleteClickHandler = () => {
		setVisibleConfirmCategory(true)
	}

	const no = () => {
		setVisibleConfirmCategory(false)
	}
	const yes = () => {
		dispatch(deleteCategoryById(categoryId))
		setVisibleConfirmCategory(false)
	}

	return route === `category` ? (
		access ? (
			<div className={st.wrap}>
				<h1 className={st.title}>??????????????????</h1>
				<div className={st.create}>
					<h5>?????????????? ?????????? ??????????????????</h5>
					<input
						type="text"
						value={newValue}
						placeholder="?????????? ??????????????????..."
						onChange={e => setNewValue(e.target.value)}
					/>
					<OrangeButton click={createNewCategory}>??????????????</OrangeButton>
				</div>
				<div className={st.change}>
					<h5>?????? ??????????????????</h5>
					<div className={st.flex}>
						<Select func={change} data={categories} />
						<VisibleButton visible={changeVisible} setVisible={setChangeVisible} text="" />
					</div>
					{changeVisible && (
						<>
							<h4>?????????? ???????????????????????? ?????? ?????????????????? ??????????????????</h4>
							<div className={st.update}>
								<input
									placeholder="?????????? ????????????????????????..."
									type="text"
									value={updateValue}
									onChange={e => setUpdateValue(e.target.value)}
								/>
								<div className={st.btns}>
									<RedButton click={deleteClickHandler}>
										?????????????? ??????????????????
									</RedButton>
									<OrangeButton click={update}>??????????????????</OrangeButton>
								</div>
								{visibleConfirmCategory && <Confirm no={no} yes={yes} />}
							</div>
						</>
					)}
				</div>
			</div>
		) : (
			<h1 className={st.access}>???????????????????????? ???????? ?????? ??????????????</h1>
		)
	) : (
		<></>
	)
}

export default CategoryAdmin
