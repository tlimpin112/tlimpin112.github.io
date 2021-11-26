function geocode(){
    var location = document.getElementById('ipinput').value;
    axios.get('https://api.ipfind.com/',{
        params:{
            ip: location,
            auth:'efb0771c-9a9f-4a3f-808a-8dfaa1ee937d'
        }
    })
    .then(function(response){
        console.log(response)

        //formatted address
        var lat = response.data.latitude;
        var latOutput = `
            <ul class = "list-group">
                <li class = "list-group-item">${lat}</li>
            </ul>
        `;
        var long = response.data.longitude;
        var longOutput = `
            <ul class = "list-group">
                <li class = "list-group-item">${long}</li>
            </ul>
        `;
        
        //output to app
        document.getElementById('formattedaddlat').innerHTML=latOutput
        document.getElementById('formattedaddlong').innerHTML=longOutput
        
    })
    .catch(function(error){
        console.log(error);
    });
}