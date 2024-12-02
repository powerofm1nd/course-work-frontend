export const registerNewUser = (user) => {
    return async (dispatch) => {
        console.log('Calling API to register user');  // Logging the start of the request
        try {
            const response = await fetch('https://localhost:7106/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                credentials: 'include',
            });

            // Check if the response was not successful
            if (!response.ok) {
                const responseBody = await response.text(); // Read the body as text for logging
                console.error("Error response body: ", responseBody); // Log the error body

                // Log all cookies after the response
                console.log("Cookies after registration response:", document.cookie);

                // Throw a custom error message to be caught in the catch block
                throw new Error(`Error: ${responseBody}`);
            }

            // Parse the response body as JSON when the response is successful
            const userFromDb = await response.json();
            console.log("RegisterNewUser RESPONSE:", userFromDb);

            // Log all cookies after the successful response
            console.log("Cookies after successful registration:", document.cookie);

            // Dispatch success action with the user data from DB
            dispatch({
                type: 'REGISTER_NEW_USER',
                payload: userFromDb,
            });
        } catch (error) {
            // Dispatch error action if something goes wrong (API error, network issue, etc.)
            console.error('Error during user registration:', error);
            dispatch({
                type: 'REGISTER_NEW_USER_ERROR',
                register_error: error.message || error, // Pass the error message or full error object
            });
        }
    };
};

export const getUser = (user) => {
    return async (dispatch) => {
        console.log('Calling API to get user'); // Logging the start of the request

        // Устанавливаем loading в true перед началом запроса
        dispatch({ type: 'GET_USER_LOADING', loading: true });

        try {
            const response = await fetch('https://localhost:7106/api/auth/currentUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                credentials: 'include',
            });

            if (!response.ok) {
                const responseBody = await response.text();
                console.error("Error response body: ", responseBody);

                // Логируем cookies после неудачного запроса
                console.log("Cookies after error getting user:", document.cookie);

                throw new Error(`Error: ${responseBody}`);
            }

            const userFromDb = await response.json();
            console.log("GetUser RESPONSE:", userFromDb);

            // Логируем cookies после успешного ответа
            console.log("Cookies after successful getting user:", document.cookie);

            // Успешный ответ
            dispatch({
                type: 'GET_USER',
                payload: userFromDb,
            });
        } catch (error) {
            console.error('Error during user getting:', error);

            // Отправляем сообщение об ошибке
            dispatch({
                type: 'GET_USER_ERROR',
                get_user_error: error.message || error,
            });
        } finally {
            // Устанавливаем loading в false после завершения запроса
            dispatch({ type: 'GET_USER_LOADING', loading: false });
        }
    };
};

export const logout = () => 
{
    return async (dispatch) => {
        console.log('Calling API to logout'); // Logging the start of the request

        try {
            const response = await fetch('https://localhost:7106/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const responseBody = await response.text();
                console.error("Error response body: ", responseBody);

                // Логируем cookies после неудачного запроса
                console.log("Cookies after error getting user:", document.cookie);

                throw new Error(`Error: ${responseBody}`);
            }

            const logout = await response.json();
            console.log("Logout RESPONSE:", logout);

            // Успешный ответ
            dispatch({
                type: 'LOGOUT_USER'
            });
        } catch (error) {
            console.error('Error during logout process:', error);
        }
    };
};

export const login = (user) => {
    return async (dispatch) => {
        console.log('Calling API to register user');  // Logging the start of the request
        try {
            const response = await fetch('https://localhost:7106/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                credentials: 'include',
            });

            // Check if the response was not successful
            if (!response.ok) {
                const responseBody = await response.text(); // Read the body as text for logging
                console.error("Error response body: ", responseBody); // Log the error body

                // Log all cookies after the response
                console.log("Cookies after registration response:", document.cookie);

                // Throw a custom error message to be caught in the catch block
                throw new Error(`Error: ${responseBody}`);
            }

            // Parse the response body as JSON when the response is successful
            const userFromDb = await response.json();
            console.log("RegisterNewUser RESPONSE:", userFromDb);

            // Log all cookies after the successful response
            console.log("Cookies after successful registration:", document.cookie);

            // Dispatch success action with the user data from DB
            dispatch({
                type: 'REGISTER_NEW_USER',
                payload: userFromDb,
            });
        } catch (error) {
            // Dispatch error action if something goes wrong (API error, network issue, etc.)
            console.error('Error during user registration:', error);
            dispatch({
                type: 'REGISTER_NEW_USER_ERROR',
                register_error: error.message || error, // Pass the error message or full error object
            });
        }
    };
};

export const authUser = (user) => {
    return async (dispatch) => {
        console.log('Calling API to auth user');  // Logging the start of the request
        try {
            const response = await fetch('https://localhost:7106/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                credentials: 'include',
            });

            // Check if the response was not successful
            if (!response.ok) {
                const responseBody = await response.text(); // Read the body as text for logging
                console.error("Error response body: ", responseBody); // Log the error body

                // Log all cookies after the response
                console.log("Cookies after auth response:", document.cookie);

                // Throw a custom error message to be caught in the catch block
                throw new Error(`Error: ${responseBody}`);
            }

            // Parse the response body as JSON when the response is successful
            const userFromDb = await response.json();
            console.log("AuthUser RESPONSE:", userFromDb);

            // Log all cookies after the successful response
            console.log("Cookies after successful authorization:", document.cookie);

            // Dispatch success action with the user data from DB
            dispatch({
                type: 'AUTH_USER',
                payload: userFromDb,
            });
        } catch (error) {
            // Dispatch error action if something goes wrong (API error, network issue, etc.)
            console.error('Error during user authorization:', error);
            dispatch({
                type: 'AUTH_USER_ERROR',
                register_error: error.message || error, // Pass the error message or full error object
            });
        }
    };
};