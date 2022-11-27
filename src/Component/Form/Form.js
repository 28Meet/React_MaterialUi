import { useState, useEffect } from "react";
import { Paper, Box, IconButton, FormControlLabel, InputLabel, FormLabel, FormControl, FormHelperText, Checkbox, RadioGroup } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { CITY } from "../Constants/Constant";
import Input from "../common/Input/Input";
import BtnField from "../common/button/BtnField";
import RadioButton from "../common/radio/RadioButton";
import DropDown from "../common/dropdown/DropDown";

const Form = () => {
    const [data, setData] = useState({
        name: "",
        address: "",
        mail: "",
        mobile: "",
        gender: "",
        city: "",
        id: 0
    });

    const [error, setError] = useState({
        nameError: false,
        addressError: false,
        mailError: false,
        mobileError: false,
        genderError: false,
        cityError: false
    });

    let { name, address, mail, mobile, gender, city, id } = data;
    let { nameError, addressError, mailError, mobileError, genderError, cityError } = error;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        if (name == "" && address == "" && mail == "" && mobile == "" && gender == "" && city == "") {
            setError({
                nameError: true,
                addressError: true,
                mailError: true,
                mobileError: true,
                genderError: true,
                cityError: true
            })
        } else if(name == ""){
            setError({...error, nameError : true});
        } else if(address == ""){
            setError({...error, addressError : true});
        } else if(mail == ""){
            setError({...error, mailError : true});
        } else if(mobile == ""){
            setError({...error, mobileError : true});
        } else if(gender == ""){
            setError({...error, genderError : true});
        } else if(city == ""){
            setError({...error, cityError : true});
        } else {
            let record = new Array();
            record = JSON.parse(localStorage.getItem('RECORD'));
            let userid = parseInt(localStorage.getItem("ID"));

            if(record.length == 0){
                userid = 1;
                id = userid;
                record = [];
                record.push(data);
            } else {
                id = userid;
                record.push(data);
            }
            userid++;
            localStorage.setItem('ID', parseInt(userid));
            localStorage.setItem('RECORD', JSON.stringify(record));
        }
    }

    const handleReset = () => {
        setError({
            nameError: false,
            addressError: false,
            mailError: false,
            mobileError: false,
            genderError: false,
            cityError: false
        });

        setData({
            name: "",
            address: "",
            mail: "",
            mobile: "",
            gender: "",
            city: ""
        });
    }

    const parentStyle = {
        boxShadow: "0px 2px 2px grey",
        borderRadius: 3,
        // border : "1px solid black",
        width: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        padding: 2
    }
    return (
        <>
            {/* <Paper> */}
            <FormControl sx={parentStyle}>
                <h2>Registration</h2>
                <FormControl>
                    <Input variant="outlined" size="small" margin="none" label="Name*" type="text" name="name" value={name} width={350} errorValue={nameError} onchange={(e) => { handleChange(e); setError({ ...data, nameError: false }) }} errMsg="Please enter your name" row={1} multiline={false} />
                </FormControl>

                <FormControl>
                    <Input variant="outlined" size="large" margin="normal" label="Address*" type="text" name="address" value={address} width={350} errorValue={addressError} errMsg="Please enter your address" row={3} multiline={true} onchange={(e) => { handleChange(e); setError({ ...data, addressError: false }) }} />
                </FormControl>

                <FormControl>
                    <Input variant="outlined" size="small" margin="none" label="Email*" type="mail" name="mail" value={mail} width={350} errorValue={mailError} errMsg="Please enter your email" row={1} multiline={false} onchange={(e) => { handleChange(e); setError({ ...data, mailError: false }) }} />
                </FormControl>

                <FormControl>
                    <Input variant="outlined" size="small" margin="normal" label="Mobile*" type="text" name="mobile" value={mobile} width={350} errorValue={mobileError} errMsg="Please enter your mobile number" row={1} multiline={false} onchange={(e) => { handleChange(e); setError({ ...data, mobileError: false }) }} />
                </FormControl>

                <FormControl>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: 11 }}>
                        <FormLabel>Gender* :</FormLabel>
                        <RadioGroup value={gender} row sx={{ paddingLeft: 1 }}>
                            <RadioButton value="male" label="Male" name="gender" onClick={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                            <RadioButton value="female" label="Female" name="gender" onClick={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                        </RadioGroup>
                    </Box>
                    {
                        (genderError && <FormHelperText sx={{ color: "red" }}> Please select gender</FormHelperText>)
                    }
                </FormControl>

                <FormControl>
                    <DropDown
                        label="City*"
                        size="small"
                        name="city"
                        value={city}
                        error={cityError}
                        items={CITY}
                        onChange={(e) => { handleChange(e); setError({ ...error, cityError: false }) }}
                    />
                    {
                        (cityError && <FormHelperText sx={{ color: "red" }}> Please select city</FormHelperText>)
                    }
                </FormControl>

                <FormControl>
                    <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", marginRight: 29 }}>
                        <FormLabel>Resume* :</FormLabel>
                        <IconButton color="primary" aria-label="upload resume" component="label">
                            <input hidden type="file" />
                            <FileCopyIcon />
                        </IconButton>
                    </Box>
                </FormControl>

                <FormControl>
                    <Box>
                        <FormControlLabel control={<Checkbox />} />
                        <FormLabel>
                            I have read company policy and term and understand it
                        </FormLabel>
                    </Box>
                </FormControl>

                <FormControl>
                    <Box>
                        <BtnField text="Submit" variant="contained" color="primary" size="medium" type="submit" handleClick={handleSubmit} />

                        <BtnField text="Reset" variant="contained" color="secondary" size="medium" type="reset" handleClick={handleReset}/>
                    </Box>

                </FormControl>
            </FormControl>
            {/* </Paper> */}
        </>
    )
}

export default Form;