import React, { useEffect, useRef, useState } from 'react'
import { saveUser } from '../service/user'
import { Country, State, City } from 'country-state-city';
import { c, useNavigate } from "react-router-dom"
import "./style.css"

let defaultState={
    firstName: "",
    lastName: "",
    eMail: "",
    gender: "",
    city: "",
    dob: "",
    country: "",
    state: "",
}
function AddForm() {
    // ["firstName", "lastName", "country", "state","eMail","gender","city", "dob"];
    let firstName = useRef()
    let [fromState, setfromState] = useState(defaultState)
    let [countries, setcountries] = useState([])
    let [states, setStates] = useState([])
    let [cities, setcities] = useState([])
    let [selectedCountry, setselectedCountry] = useState("AF")
    let [selectedState, setselectedState] = useState("")
    let [selecteCity, setselecteCity] = useState("")
    let coutnrySample = {
        "name": "",
        "isoCode": "",
        "flag": "",
        "phonecode": "",
        "currency": "",
        "latitude": "",
        "longitude": "",
    }
    useEffect(() => {
        console.log(Country.getAllCountries(), "checkCountry")
        setcountries([coutnrySample,...Country.getAllCountries()])
    }, [])


    let navigate = useNavigate()
    console.log(countries, "Country")
    console.log(State.getStatesOfCountry("IN"), "checkot")
    const onChangeHangel = (event) => {
        let name = event.target.name
        let value = event.target.value
        setfromState((prev) => { return { ...prev, [name]: value } })
    }
    let regexNormal = /^[a-zA-Z ]{3,30}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let genderregex = /^(male|female|other)$/i;
    let dobregex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    console.log(selectedCountry, "selectedCountry")
    console.log(selectedState, "selectedState")

    let stateSample = {
        countryCode: "",
        isoCode: "",
        latitude: "",
        longitude: "",
        name: ""
    }
    let sampleCity={
        "name": "",
        "countryCode": "",
        "stateCode": "",
        "latitude": "",
        "longitude": ""
    }
    
    const submitHandle = async (e) => {
        debugger

        e.preventDefault()
        console.log(e, "check")
        fromState.country = Country.getCountryByCode(selectedCountry)?.name
        fromState.state = State.getStateByCode(selectedState)?.name
        console.log(City.getCitiesOfState(selectedCountry, selectedState),"selected coose city")
        fromState.city = selecteCity
        console.log(fromState,"fromState")
        let dataSaved = await saveUser(fromState)
        console.log(dataSaved, "dataSaved")
        // if()
        if(dataSaved.status=="200"&&dataSaved.data.code==200){
            setfromState(defaultState)
            alert("Data saved Suceessfully")
        }else{
            alert("something went wrong")
        }
        
    }

    const genderChoice = [
        { label: "", value: "" },
        { label: "male", value: "male" },
        { label: "female", value: "female" },
        { label: "other", value: "other" },
    ]

    const countryHandle = (e) => {
        setselectedCountry(e.target.value)
        console.log(e.target.value, "countryHandle")
        let states = State.getStatesOfCountry(e.target.value)
        console.log(states, "states")
        setStates([stateSample, ...states])
    }

    const stateHandle = (e) => {
        let cityies = City.getCitiesOfState(selectedCountry, e.target.value)
        console.log(cityies, "cityies")
        setselectedState(e.target.value)
        setcities([sampleCity,...cityies])
    }

    const cityHandle = (e) => {
        setselecteCity(e.target.value)
    }

    console.log("selectedCountry",selectedCountry)
    console.log("selectedState",selectedState)
    console.log("selecteCity",selecteCity)
    return (
        <div className='mainDiv' >
            <form onSubmit={submitHandle} className='formDiv'>
                <div className='d-flex mt-2'>
                    <div>
                        <div> <label>firstName</label></div>
                        <input className='input-common' value={fromState.firstName} required title='Alteast 3 Alphabet' name={"firstName"} onChange={onChangeHangel} />
                    </div>

                    <div className='ml-2'>
                        <div><label>LastName</label></div>
                        <input className='input-common' value={fromState.lastName} required name={"lastName"} onChange={onChangeHangel} />
                    </div>
                </div>
                <div className='d-flex mt-2'>
                    <div>
                        <div><label>Email</label></div>
                        <input className='input-common' value={fromState.eMail} required name={"eMail"} onChange={onChangeHangel} />

                    </div>
                    <div className='ml-2'>
                        <div> <label>Gender</label></div>
                        {/* <input value={fromState.gender} required name={"gender"} onChange={onChangeHangel} /> */}
                        <select className='input-common' name="gender" required onChange={onChangeHangel} value={fromState.gender}>{genderChoice.map((item) => {
                            return <option value={item.value}>{item.label}</option>
                        })}</select>
                    </div>
                </div>
                <div className='d-flex mt-2'>
                    <div>
                        <div><label>Dob</label></div>
                        <input className='input-common' required type='date' value={fromState.dob}  name={"dob"} onChange={onChangeHangel} />

                    </div>
                    <div className='ml-2'>
                        <div><label>Country</label></div>
                        {/* <input value={fromState.country} required name={"country"} onChange={onChangeHangel} /> */}
                        <select className='input-common' required onChange={countryHandle} >{countries?.map((item) => <option value={item.isoCode}>{item.name}</option>)}</select>
                    </div>


                </div>
                <div className='d-flex mt-2'>
                    <div>
                        <div><label>State</label></div>
                        {/* <input value={fromState.state} required name={"state"} onChange={onChangeHangel} /> */}
                        <select className='input-common' required onChange={stateHandle}>{states?.map((item) => <option value={item.isoCode}>{item.name}</option>)}</select>
                    </div>
                    <div className='ml-2'>
                        <div><label>City</label></div>
                        {/* <input value={fromState.city} required name={"city"} onChange={onChangeHangel} /> */}
                        <select className='input-common' required onChange={cityHandle}>{cities?.map((item) => <option>{item.name}</option>)}</select>
                    </div>
                </div>

                <div className='mt-2 d-flex justify-content-center'>
                    <button>Save</button>
                    <button className='ml-2' onClick={() => navigate("/userList")}>User List</button>

                </div>
            </form>
        </div>
    )
}

export default AddForm