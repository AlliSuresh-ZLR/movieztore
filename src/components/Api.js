import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Api() {
    const [searchkey,setSearchkey]=useState("");

   

const submitHandler=async (e)=>{

    const options = {
        method: 'GET',
        url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
        params: {q: `${searchkey}`},
        headers: {
          'X-RapidAPI-Key': '80470192efmsh2e6afc5b89c8a72p1ab11ejsn240bcdbaef97',
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
      };
    if(e.key==="Enter")await axios.request(options).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        

}

    
      
   
  return (
    <div>
        <input placeholder='search here'  onKeyDown={(e)=>{setSearchkey(e.target.value);submitHandler(e)}}/>
        
    </div>
  )
}

export default Api