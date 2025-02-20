import { ACTION_TYPE } from './action-type';

export const categoryName = (categoryName) => ({
	type: ACTION_TYPE.SELECT_CATEGORY,
	payload: categoryName,
});
