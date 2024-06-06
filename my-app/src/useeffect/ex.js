import React, {useState,useEffect} from "react";

const url="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const Index = () => {
    const [drinkdata,setdrinkdata]= useState([]);
    const [searchTerm,setsearchTerm]= useState('');
    const[loading,setloading]=useState(false);
    const[iserror,seterror]=useState({status:false,msg:''})


    const fetchDrink= async (apiurl) => {
        setloading(true);
        seterror({status:false,msg:''})
        try{
        const response = await fetch(apiurl);
        const {drinks}  =await response.json();
        setdrinkdata(drinks);
        setloading(false);
        seterror(  {status:false,msg:''})
        if(!drinks){
            throw new Error("data not found")
        }
        }
        catch(error){
            setloading(false);
            seterror({status:true, msg: error.message || "something went wrong.."})


        }


    }

    useEffect(()=>{
        const correcturl=`${url}${searchTerm}`;
        fetchDrink(correcturl);
    },[searchTerm])

    return(
        <div>
           <form>
            <input type="text"
            name="search"
            id="search"
            placeholder="search"
            value={searchTerm}
            onChange={(e)=> setsearchTerm(e.target.value)}/>

            
            <hr/>
            { loading && !iserror?.status && <h3>loading.....</h3>}
            { iserror?.status && <h3 style={{color:'red'}}>{iserror.msg}</h3>}
            
              {  !loading && !iserror?.status &&   <ul className="cocktail">
                {
                    drinkdata.map((eachobj)=>{
                        const {idDrink,strDrink,strDrinkThumb}=eachobj;
                        return (
                            <li key={idDrink}>
                                <div>
                                    <img src={strDrinkThumb} alt={strDrink}/>
                                    <div className="text">
                                        <h3>{strDrink}</h3>
                                    </div>
                                </div>
                            </li>
                        )

                    })
                }
            </ul>
}
           </form>
        </div>
    );
};
 export default Index;