export const updateObject = (sourceObject, fieldsToUpdate) => {
	return {
		...sourceObject,
		...fieldsToUpdate,
	};
};
