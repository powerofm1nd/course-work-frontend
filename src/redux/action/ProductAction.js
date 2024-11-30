export const createProduct = (newProduct) => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://localhost:7106/api/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            const createdProduct = await response.json();

            dispatch({
                type: 'CREATE_PRODUCT',
                newProduct: createdProduct,
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };
};

export const getProduct = (productId) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_PRODUCT_REQUEST' });

       

        try {
            const response = await fetch(`https://localhost:7106/api/product/get?productId=${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch product: ${response.statusText}`);
            }

            const productFromDb = await response.json();

            dispatch({
                type: 'GET_PRODUCT_SUCCESS',
                newCurrentProduct: productFromDb,
            });
        } catch (error) {
            dispatch({
                type: 'GET_PRODUCT_ERROR',
                error: error.message,
            });
        }
    };
};
