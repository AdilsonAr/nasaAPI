function apiQ(date1, date2){
    $.ajax({
        type:'GET',
         url:`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date1}&end_date=${date2}&api_key=6JMuTf7Rw8S6edVPIeXmyDgL5Cmr6z4olbbv7Xve`
    }).done(function (data){
        json=data.near_earth_objects

        if ( document.getElementById("main")) {
            $("#main").remove()
        }
        $("#mainCon").append("<div id='main'></div>")

        for(let i in json){
            
            $("#main").append(`<h2>
                asteroides cercanos en ${i}
                </h2>`)
                
                $("#main").append(`<table id='t${i}' class='table tdinamica'>
                <tr><th>nombre</th> <th>url JPL</th> <th>velocidad relativa Km/h</th> <th>diametro minimo en Km</th> <th>diametro maximo en Km</th></tr>
                </table>`)
                
                for(let j in json[i]){
                    $(`#t${i}`).append(`<tr><td>${json[i][j].name}</td> <td><a href="${json[i][j].nasa_jpl_url}" target="_blank">${json[i][j].nasa_jpl_url}</a></td> <td>${json[i][j].close_approach_data[0].relative_velocity.kilometers_per_hour}</td> <td>${json[i][j].estimated_diameter.kilometers.estimated_diameter_min}</td> <td>${json[i][j].estimated_diameter.kilometers.estimated_diameter_max}</td></tr>`)
                }
        }

    }).fail(function (){
        swal("Vaya algo salio mal!", "su peticion sobrepaso el limite!", "error")
    })
}


$("#frm1").submit(function (event){
    event.preventDefault();
    let date1=$("#date1").val()
    let date2=$("#date2").val()
    v1=isNaN(new Date(date1).getTime())
    v2=isNaN(new Date(date2).getTime())
    if(!v1 && !v2 && date2>date1){
        apiQ(date1, date2)
    }else{
        //alerta aca
        swal("Vaya algo salio mal!", "asegurese de ingresar los parametros correctamente!", "error")
    }
    
})


