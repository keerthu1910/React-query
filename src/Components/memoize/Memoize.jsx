import { useEffect, useMemo, useState,useCallback } from "react"
import axios from "axios"
export const Memoize = () => {
    const [data,setData] = useState([]);
    const getProducts = useCallback(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response=>setData(response.data))
                .catch(error=>alert(error.response.data))
    },[])
    
    useEffect(()=>{
        getProducts();
        console.log('once')
    },[]);

    return(
        <div>
            <h2>Memoize using Usememo</h2>
            {/* {arr} */}
        </div>
    )
}