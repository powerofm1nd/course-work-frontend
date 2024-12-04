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

export const deleteProduct = (productId) => {
    return async (dispatch) => {
        dispatch({ type: 'DELETE_PRODUCT_REQUEST' });

        try {
            // Sending a POST request to delete the product
            const response = await fetch('https://localhost:7106/api/product/delete/' + productId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }), // Passing productId in the request body
                credentials: 'include', // Include cookies (if necessary)
            });

            // Log the response object for debugging
            console.log('Response:', response);

            // Check if the response is successful
            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                let responseBody = null;

                if (contentType && contentType.includes('application/json')) {
                    // Parse JSON if Content-Type is application/json
                    responseBody = await response.json();
                    console.log('Response Body:', responseBody);
                } else {
                    // Fallback: Parse as plain text for non-JSON responses
                    responseBody = await response.text();
                    console.log('Response Text:', responseBody);
                }

                // Dispatch success action with the response
                dispatch({
                    type: 'DELETE_PRODUCT_SUCCESS',
                    productId,
                    message: responseBody, // Optionally pass the server's response
                });
            } else {
                // Throw an error if the server response indicates failure
                const errorText = await response.text(); // Parse error message as text
                throw new Error(`Failed to delete product: ${errorText}`);
            }
        } catch (error) {
            // Log and dispatch the error
            console.error('Delete Product Error:', error);
            dispatch({
                type: 'DELETE_PRODUCT_ERROR',
                error: error.message, // Pass the error message to the state
            });
        }
    };
};
