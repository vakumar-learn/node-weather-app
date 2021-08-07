console.log('file is attached');


const addressInput = document.querySelector('input');
const addressForm = document.querySelector('form');
const fmsg = document.querySelector('#msg-1');

addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fmsg.textContent = "Loading..."
    const address = addressInput.value;
    fetch(`weather?address=${address}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                fmsg.textContent = data.error;
            }
            else {
                fmsg.textContent = data.forecast;
            }
        })
        .catch(error => {
            fmsg.textContent = "Unexpected error, Please try Again"
        })

})