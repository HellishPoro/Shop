import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Input } from '../../../../components';
import styled from 'styled-components';
import {
	sanitizeComfort,
	sanitizeContent,
	sanitizeDesign,
	sanitizeFunctional,
	sanitizeMaterial,
} from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { categoryName, saveProductAsync, setCategories } from '../../../../actions';
import { selectCategories } from '../../../../selectors';
import { PROP_TYPE } from '../../../../constants';
import { request } from '../../../../utils/request';

const ProductEditContainer = ({
	className,
	product: {
		_id: id,
		title,
		image,
		content,
		price,
		design,
		comfort,
		materials,
		functionality,
		categoryName: initialCategoryName,
	},
}) => {
	const [selectedCategoryName, setSelectedCategoryName] = useState(
		initialCategoryName || { label: '' },
	);
	const categories = useSelector(selectCategories);

	const [imageUrlValue, setImageUrlValue] = useState(image);
	const [titleValue, setTitleValue] = useState(title);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isCreating = useMatch('/products');

	const designRef = useRef(null);
	const comfortRef = useRef(null);
	const materialsRef = useRef(null);
	const functionalityRef = useRef(null);
	const priceRef = useRef(null);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(image);
		setTitleValue(title);
	}, [image, title]);

	useEffect(() => {
		request('/categories', 'GET').then(({ data }) => dispatch(setCategories(data)));
	}, [dispatch]);

	useEffect(() => {
		setSelectedCategoryName(initialCategoryName || { label: '' });
	}, [initialCategoryName]);

	const handleCategoryChange = (e) => {
		setSelectedCategoryName(e.target.value);
		dispatch(categoryName(e.target.value));
	};

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.value);
		const newDesign = sanitizeDesign(designRef.current.value);
		const newComfort = sanitizeComfort(comfortRef.current.value);
		const newMaterialsRef = sanitizeMaterial(materialsRef.current.value);
		const newFunctionalityRef = sanitizeFunctional(functionalityRef.current.value);
		const newPriceRef = Number(priceRef.current.innerHTML);

		const category = categories.find((c) => c.name === selectedCategoryName);
		if (!category) {
			alert('Ошибка: выберите категорию!');
			return;
		}

		dispatch(
			saveProductAsync(id, {
				categoryName: { label: category.label, name: category.name },
				image: imageUrlValue,
				title: titleValue,
				content: newContent,
				price: newPriceRef,
				functionality: newFunctionalityRef,
				materials: newMaterialsRef,
				design: newDesign,
				comfort: newComfort,
			}),
		).then(({ id }) => navigate(`/products/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	return (
		<div className={className}>
			<div className="table-header">
				<h2>Редактирование товара</h2>
			</div>

			<table className="product-table">
				<thead>
					<tr>
						<th>Наименование</th>
						<th>Категория</th>
						<th>Стоимость</th>
						<th>Фото</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<Input
								value={titleValue}
								placeholder="Введите название"
								onChange={onTitleChange}
							/>
						</td>
						<td>
							<select
								value={selectedCategoryName}
								onChange={handleCategoryChange}
								className="category-select"
							>
								<option value="">Выберите категорию</option>
								{categories.map((category) => (
									<option key={category._id} value={category.name}>
										{category.name}
									</option>
								))}
							</select>
						</td>
						<td>
							{isCreating ? (
								<div
									contentEditable={true}
									suppressContentEditableWarning={true}
									className="price"
									ref={priceRef}
								>
									{''}
								</div>
							) : (
								<div
									contentEditable={true}
									suppressContentEditableWarning={true}
									className="price"
									ref={priceRef}
								>
									{price}
								</div>
							)}
						</td>
						<td>
							<Input
								value={imageUrlValue}
								placeholder="URL изображения"
								onChange={onImageChange}
							/>
						</td>
						<td>
							<button
								className="details-btn"
								onClick={() => setIsDetailsOpen(true)}
							>
								Описание
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			{isDetailsOpen && (
				<div className="details-modal">
					<div className="modal-content">
						<div className="modal-header">
							<h3>Дополнительные параметры товара</h3>
							<button
								className="close-btn"
								onClick={() => setIsDetailsOpen(false)}
							>
								&times;
							</button>
						</div>

						<div className="form-grid">
							<div className="form-group">
								<label>Дизайн:</label>
								<textarea
									ref={designRef}
									defaultValue={design}
									className="form-textarea"
									placeholder="Опишите особенности дизайна..."
								/>
							</div>

							<div className="form-group">
								<label>Комфорт:</label>
								<textarea
									ref={comfortRef}
									defaultValue={comfort}
									className="form-textarea"
									placeholder="Опишите уровень комфорта..."
								/>
							</div>

							<div className="form-group">
								<label>Материалы:</label>
								<textarea
									ref={materialsRef}
									defaultValue={materials}
									className="form-textarea"
									placeholder="Перечислите используемые материалы..."
								/>
							</div>

							<div className="form-group">
								<label>Функционал:</label>
								<textarea
									ref={functionalityRef}
									defaultValue={functionality}
									className="form-textarea"
									placeholder="Опишите функциональные особенности..."
								/>
							</div>

							<div className="form-group full-width">
								<label>Подробное описание:</label>
								<textarea
									ref={contentRef}
									defaultValue={content}
									className="form-textarea large"
									placeholder="Детальное описание товара..."
									rows="5"
								/>
							</div>
						</div>

						<div className="modal-footer">
							<button
								className="save-btn"
								onClick={() => {
									onSave();
									setIsDetailsOpen(false);
								}}
							>
								Сохранить изменения
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export const ProductEdit = styled(ProductEditContainer)`
	padding: 2rem;
	width: 1200px;
	background: #f8f9fa;
	border-radius: 12px;

	.table-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 2px solid #eceff1;

		h2 {
			color: #2d3436;
			font-size: 1.75rem;
			margin: 0;
			font-weight: 600;
		}
	}

	.save {
		width: 42px;
		height: 42px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;

		&:hover {
			transform: rotate(15deg) scale(1.1);
		}
	}

	.product-table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0 1.5rem;

		th {
			background: #ffffff;
			color: #6c757d;
			font-weight: 600;
			padding: 1.25rem;
			border: none;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				bottom: -0.75rem;
				left: 50%;
				transform: translateX(-50%);
				width: 80%;
				height: 2px;
				background: #e0e0e0;
			}
		}

		td {
			background: #ffffff;
			padding: 1.25rem;
			border-radius: 12px;
			box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
			margin: 1rem 0;
			border: 1px solid #f0f0f0;

			&:not(:last-child) {
				margin-right: 2rem;
			}
		}

		input,
		select {
			width: 100%;
			padding: 0.75rem 0.25rem;
			border: 2px solid #e0e0e0;
			border-radius: 8px;
			transition: all 0.3s;
			font-size: 1rem;

			&:focus {
				border-color: #9c27b0;
				box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.15);
			}
		}
	}

	.details-btn {
		background: #9c27b0;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.3s;

		&:hover {
			background: #8e24aa;
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(156, 39, 176, 0.25);
		}
	}

	.details-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;

		.modal-content {
			background: white;
			width: 800px;
			max-width: 95%;
			border-radius: 12px;
			padding: 2rem;
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
		}

		.modal-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1.5rem;

			h3 {
				color: #212529;
				margin: 0;
				font-size: 1.25rem;
			}

			.close-btn {
				background: none;
				border: none;
				font-size: 1.5rem;
				color: #868e96;
				cursor: pointer;

				&:hover {
					color: #495057;
				}
			}
		}

		.form-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
			margin-bottom: 2rem;
		}

		textarea {
			width: 100%;
			padding: 0.75rem;
			border: 1px solid #dee2e6;
			border-radius: 8px;
			min-height: 100px;
			resize: vertical;
			transition: all 0.2s;

			&:focus {
				border-color: #4dabf7;
				box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.2);
			}
		}

		.modal-footer {
			display: flex;
			justify-content: flex-end;
			gap: 1rem;

			button {
				padding: 0.75rem 1.5rem;
				border-radius: 8px;
				border: none;
				cursor: pointer;
				transition: all 0.2s;
			}

			.save-btn {
				background: #40c057;
				color: white;

				&:hover {
					background: #37b24d;
					transform: translateY(-1px);
				}
			}
		}
	}
`;

ProductEdit.propTypes = {
	product: PROP_TYPE.PRODUCT,
};
