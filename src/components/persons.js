import React,{ useState, useEffect,Suspense } from "react";

const PersonInfo = React.lazy(() => import("./personInfo"));

const Persons = () => {
  const [personData, setPersonData] = useState([]);
  useEffect(() => {
    //calling two API simultaneously 
    Promise.all([fetch('./json-data.json'),
                fetch('./xml-data.xml')]).then((responses)=>{                                 
                  return Promise.all(responses.map(async (response)=>{                   
                    const isJson = response.headers.get('content-type').includes('application/json');
                    // check for error response                                
                    if (!response.ok) {                     
                      throw new Error('Something went wrong');
                    }                    
                    return isJson ?  response.json() :  response.text();                                
                  }));                 
                }).then((data)=>{    
                    let parentDataJSON = [...data[0].person];
                    let parentDataXML = [];                                 
                    //creating DOMParser to handle XML tags                       
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data[1], "application/xml");
                    const _eleNodes = xmlDoc.getElementsByTagName('person').length;
                    //iteration for extracting XML person tags dynamically
                    for(let ele = 0; ele < _eleNodes; ele++)
                    {                
                        const _pnode =  xmlDoc.getElementsByTagName('person')[ele];
                        const id = _pnode.getElementsByTagName('id')[0].childNodes[0].nodeValue;
                        const fname = _pnode.getElementsByTagName('firstName')[0].childNodes[0].nodeValue;
                        const lname = _pnode.getElementsByTagName('lastName')[0].childNodes[0].nodeValue;
                        //pushing object to parentDataXML array obj
                        parentDataXML.push({id:id,firstName:fname,lastName:lname});
                    } 
                    //console.log(parentDataXML);                   
                    //merging & sorting array object            
                    const mergedData = [...parentDataJSON, ...parentDataXML].sort(function(arr1, arr2) {                  
                      return arr1.id - arr2.id;
                    });                
                    //console.log(mergedData);
                    //updating the state value
                    setPersonData(mergedData);
                   
                }).catch((err)=>{ 
                    console.log(err);
                });
  }, []);

  return (
    <>
     <div className="app-title">
       <h4>Persons Details</h4>       
     </div>     
     <Suspense fallback={<h4>Fetching Data...</h4>}>  
      <div className="profile-container">     
        {personData.map((data,key)=>{        
          return <PersonInfo key={key} data={data}/>
        })}       
      </div>
      </Suspense>     
    </>
  );

};

export default Persons;
