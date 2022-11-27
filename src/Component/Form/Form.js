import { useState, useEffect } from "react";
import { Paper, Box, IconButton, FormControlLabel, InputLabel, FormLabel, FormControl, FormHelperText, Checkbox, RadioGroup, Tooltip } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloseIcon from '@mui/icons-material/Close';
import { CITY } from "../Constants/Constant";
import Input from "../common/Input/Input";
import BtnField from "../common/button/BtnField";
import RadioButton from "../common/radio/RadioButton";
import DropDown from "../common/dropdown/DropDown";

const Form = ({ close, updateId, resetId }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState({
        name: "abc",
        address: "abcdefg",
        mail: "abc@gmail.com",
        mobile: "1234567890",
        gender: "male",
        city: "Ahmedabad",
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
        } else if (name == "") {
            setError({ ...error, nameError: true });
        } else if (address == "") {
            setError({ ...error, addressError: true });
        } else if (mail == "") {
            setError({ ...error, mailError: true });
        } else if (mobile == "") {
            setError({ ...error, mobileError: true });
        } else if (gender == "") {
            setError({ ...error, genderError: true });
        } else if (city == "") {
            setError({ ...error, cityError: true });
        } else {
            let record = new Array();
            record = JSON.parse(localStorage.getItem('RECORD'));
            let userid = parseInt(localStorage.getItem("ID"));

            if (isUpdate) {
                for(let i = 0; i < record.length; i++){
                    for(let key in record[i]){
                        if(record[i].id === updateId){
                            record[i].name = data.name;
                            record[i].address = data.address;
                            record[i].mail = data.mail;
                            record[i].mobile = data.mobile;
                            record[i].gender = data.gender;
                            record[i].city = data.city;
                        }
                    }
                }

                localStorage.setItem("RECORD", JSON.stringify(record));
                setIsUpdate(false);
                resetId();
                handleReset();
                close();
            } else {
                if (record.length == 0) {
                    userid = 1;
                    data.id = userid;
                    record = [];
                    record.push(data);
                } else {
                    data.id = userid;
                    record.push(data);
                }
                userid++;
                localStorage.setItem('ID', parseInt(userid));
                localStorage.setItem('RECORD', JSON.stringify(record));
            }

        }
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
        padding: 1
    }

    const mainContainer = {
        zIndex : 2,
        width : 500,
        position : "absolute",
        top : 100,
        left : 400
    }

    const closeBtnStyle = {
        cursor: "pointer",
        position: 'relative',
        top: -60,
        right: -190
    }

    const getUserData = () => {
        if (updateId != 0) {
            let record = new Array();
            record = JSON.parse(localStorage.getItem('RECORD'));
            let user = record.filter(userDetail => { return userDetail.id == updateId });
            setIsUpdate(true);
            user = user[0];
            setData(user);
        }
    }

    useEffect(() => {
        getUserData();
    }, [updateId])

    return (
        <>
            <Paper sx={mainContainer}>
            <FormControl sx={parentStyle}>
                <Box>
                    {
                        (isUpdate) ? <h2>Edit</h2> : <h2>Registration</h2>
                    }
                    <Box sx={closeBtnStyle}>
                        <Tooltip title="Close">
                            <IconButton onClick={close}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

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
                        <BtnField text={(isUpdate) ? "Edit" : "Sign Up"} variant="contained" color="primary" size="medium" type="submit" handleClick={handleSubmit} />

                        <BtnField text="Reset" variant="contained" color="secondary" size="medium" type="reset" handleClick={handleReset} />
                    </Box>

                </FormControl>
            </FormControl>
            </Paper>
        </>
    )
}

export default Form;