const Base_url=process.env.API_URL || "https://investors-hub-new.onrender.com";
 import axios from "axios";

  export  const sendOtp = async (phone) => {
       console.log("otp number::",phone)
        let data = JSON.stringify(phone);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Base_url+'otpsend',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                return response
            })
            .catch((error) => {
                console.log(error);
            });

    }