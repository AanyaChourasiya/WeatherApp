const submitBtn = document.getElementById('submitBtn')
const cityName = document.getElementById('cityName') 
const city_name = document.getElementById('city_name') 
const temp_real_val = document.getElementById('temp_real_val')
const temp_status = document.getElementById('temp_status')

const dataHide = document.querySelector('.middle_layer')

const getInfo = async(event) => {
    //it will stop refreshing the page again and again
    event.preventDefault()
    let cityVal = cityName.value

    if(cityVal === ""){
        city_name.innerText = `Please write the city name before search`
        dataHide.classList.add('data_hide')
    }  
    else{
        try{
            //units=metrics, so that humee celcius mein data mileee
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=06885a2a6704fd0bb324fb2ade5e77fd`
            
            const response = await fetch(url)
            // to convert json data into object
            const data = await response.json()
            // console.log(response)

            // console.log(data)

            //to create array of an object so that we can easily get whatever we want
            const arrData = [data]

            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`
            temp_real_val.innerText = arrData[0].main.temp
            // temp_status.innerText = arrData[0].weather[0].main

            // condition to check sunny or cloudy
            const temp_mood= arrData[0].weather[0].main;

            if(temp_mood === "Clear"){
                temp_status.innerHTML = "<i class = 'fas fa-sun' style = 'color:#eccc68;'> </i>"
            }else if(temp_mood === "Clouds"){
                temp_status.innerHTML = "<i class = 'fas fa-cloud' style = 'color:#f1f2f6;'> </i>"
            }else if(temp_mood === "Rain"){
                temp_status.innerHTML = "<i class = 'fas fa-rain' style = 'color:#a4b0be;'> </i>"
            }else{
                temp_status.innerHTML = "<i class = 'fas fa-cloud' style = 'color:#eccc68;'> </i>"
            }

            dataHide.classList.remove('data_hide')

        }
        catch{
            city_name.innerText = `Please enter the city name properly`
            dataHide.classList.add('data_hide')
        }
    }
}

submitBtn.addEventListener('click',getInfo)