class Auth{
    constructor(){
        this.authenticated = false;
    }

    login(cb){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'abc@123', password:'meld123'})
        };
        fetch('http://35.201.2.209:8000/login', requestOptions)
        .then(async response => {
            const data = await response.text();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            //this.setState({ postId: data.id })
        })
        .catch(error => {
            //this.setState({ errorMessage: error });
            console.error('There was an error!', error);
        });
        //this.authenticated = true;
        cb();
    }

    logout(cb){
        this.authenticated = false;
    }

    isAuthenticated(){
        return this.authenticated;
    }

}

export default new Auth();