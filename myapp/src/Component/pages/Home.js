import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Home() {

    const [users, setUsers] = useState([]);
    const [input, setInput] = useState("");
    const [filterdata, SetFilterdata] = useState([])

    const inputval = (e) => {
        let val = e.target.value;
        console.log(val)
        setInput(val);
    }



    let flag = true;
    let dis = document.querySelector("body");
    let ft = document.querySelector(".App");
    // let tx = document.getElementById("root")
    const Ui = () => {
        if (flag == true) {
            dis.style.backgroundColor = "White";
           
            // tx.style.color = "red"
            flag = false
        } else {
            dis.style.backgroundColor = "gray";
            
            flag = true
        }
    }

    let searchdata = () => {
        let result = users.filter((val, i) => {
            let un = input.localeCompare(val.username);
            let n = input.localeCompare(val.name);
            let c = input.localeCompare(val.company.name);
            if (un == 0 || n == 0 || c == 0) {
                return val
            }

        })
       

        SetFilterdata(result)
        setInput("")
    }

    useEffect(async () => {

        let res = await axios.get("https://jsonplaceholder.typicode.com/users");
        // console.log(res.data);
        setUsers(res.data);
    }, [])
    return (
        <>
            <input type="text" placeholder='Enter username ,name , companyName' value={input} onChange={(e) => (inputval(e))}></input>
            <button onClick={() => {
                searchdata()
            }}>search</button>
            <button onClick={() => (Ui())}>UI</button>
            {filterdata.length != 0 ? 
                 <div className="container">
                    <div className="py-4">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">name</th>
                                    <th scope="col">username</th>
                                    <th scope="col">email</th>
                                    <th scope="col">phone</th>
                                    <th scope="col">website</th>
                                    <th scope="col">companyName</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterdata.map((user, i) => (
                                    <tr key={i}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.website}</td>
                                        <td>{user.company.name}</td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                : <div className="container" >
                    <div className="py-4">
                        <table className="table" >
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">name</th>
                                    <th scope="col">username</th>
                                    <th scope="col">email</th>
                                    <th scope="col">phone</th>
                                    <th scope="col">website</th>
                                    <th scope="col">companyName</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={i}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.website}</td>
                                        <td>{user.company.name}</td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </table>
                    </div>
                </div>



        }
           
           
        </>
    )
}

export default Home
