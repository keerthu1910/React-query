import { useState} from "react";
import './style.scss';
import { Mapcomponent } from "./Mapcomponent";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Posts = () => {
    const {data=[],error,isLoading} = useQuery({
        queryKey:['posts'],
        queryFn:()=>fetch('https://jsonplaceholder.typicode.com/posts').then(response=>response.json())
    });
    const {mutate,isError,isSuccess} = useMutation({
        mutationFn:(newdata)=>fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            body:JSON.stringify(newdata),
            headers:{"Content-type":"application/json ; charset=UTF-8"}
        }).then(response=>response.json)
    })
    const [searchvalue,setSearchValue] = useState('');
    const [seracheddata,setSearchedData] = useState([]);
    const [pages,setPages] = useState(0);

    const handleSearch = () => {

        const ddata = data.filter((data)=>(
            data.title === searchvalue
        ))
        setSearchedData(ddata)
    }

    return(
        <>
        <div className="search-container">
            <label htmlFor="searchbox">Title</label>
            <input type='text' id='searchbox' className='searchbox' onChange={(e)=>setSearchValue(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
        <div className="searcheddata-container">
            <h3>Search results:</h3>
            <Mapcomponent pdata={seracheddata} />
        </div>
        <div className="posts-container">
            <label>Search Page:</label>
            <input type='number' onChange={(e)=>setPages(e.target.value)}/>
            <button onClick={()=>{
                mutate({
                    "userId": 502,
                    "id": 1456,
                    "title": "helloworld"
                })
            }}>Add post</button>
            <Mapcomponent pdata={data?.slice(pages*10,pages*10+10)}/>
            <div className="pagination-container">
                <button onClick={()=>{(pages === 0 ) ? setPages(0) :setPages(pages-1)}}>Prev</button>
                {
                    [...Array(data.length / 10)].map((item,index)=>(
                        <button key={index} onClick={()=>setPages(index)}>{index+1}</button>
                    ))
                }
                <button onClick={()=>{(pages <= Math.floor((data.length)/10)) ? setPages(pages+1) : setPages(Math.floor((posts.length)/10))}}>Next</button>
            </div>
        </div> 
        </>
    )
}