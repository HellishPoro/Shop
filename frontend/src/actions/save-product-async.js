import { request } from '../utils/request';
import { setProductData } from './set-product-data';

export const saveProductAsync = (id, product) => async (dispatch) => {
	console.log(id);
	console.log(product);
	const method = id ? 'PATCH' : 'POST';
	const URL = id ? `/products/${id}/edit` : '/products';
	const response = await request(URL, method, product);

	console.log('Ответ от сервера:', response);

	if (!response?.data?.id) {
		throw new Error('Ошибка: сервер не вернул ID продукта');
	}

	dispatch(setProductData(response.data));
	return response.data;
};
