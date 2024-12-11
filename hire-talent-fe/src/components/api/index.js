
const endpoint = 'http://localhost:5000/api/v1/'

const headers = {
    'Content-Type': 'application/json',
    'token': `Bearer ${localStorage.getItem('token')}`
}

export const post = async (path, body) => {

    const api = endpoint + path;

    const response = await fetch(
        api,
        {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }
    );
    if (!response.ok) {
        console.error("Error occurred");
        throw new Error("Error");
    }
    return response;
}

export const put = async (path, body) => {

    const api = endpoint + path;

    const response = await fetch(
        api,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });

    if (!response.ok) {
        console.error("Error occurred: ");
        throw new Error("Error")
    }

    return response;
}

export const remove = async (path, body) => {

    const api = endpoint + path;

    const response = await fetch(
        api,
        {
            method: 'DELETE',
            headers,
            body: JSON.stringify(body)
        });

    if (!response.ok) {
        console.error("Error occurred: ");
        throw new Error("Error")
    }

    return response;
}
