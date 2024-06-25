export const Mapcomponent = (props) => {
    const data = props.pdata;
    return(
        <div>
             {data?.map((item)=>(
                    <div key={item.id}>
                        <h4>id:{item.id}</h4>
                        <h4>title:{item.title}</h4>
                        <h4>body:{item.body}</h4>
                    </div>
                ))
            }
        </div>
    )
}

