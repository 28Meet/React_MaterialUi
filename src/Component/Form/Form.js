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
        name: "Meet",
        address: "vastral",
        mail: "meet@gmail.com",
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

    let { name, address, mail, mobile, gender, city } = data;
    let { nameError, addressError, mailError, mobileError, genderError, cityError } = error;

    const parentStyle = {
        boxShadow : "0px 2px 2px grey",
        borderRadius : 3,
        // border : "1px solid black",
        width : 500,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        margin : "auto",
        padding : 2
    }
    return (
        <>
            {/* <Paper> */}
                <FormControl sx={parentStyle}>
                    <h2>Registration</h2>
                    <FormControl>
                        <Input variant="outlined" size="small" margin="none" label="Name*" type="text" name="name" value={name} width={350} errorValue={true} errMsg="Please enter your name" row={1} multiline={false} />
                    </FormControl>

                    <FormControl>
                        <Input variant="outlined" size="large" margin="normal" label="Address*" type="text" name="address" value={address} width={350} errorValue={addressError} errMsg="Please enter your address" row={3} multiline={true} />
                    </FormControl>

                    <FormControl>
                        <Input variant="outlined" size="small" margin="none" label="Email*" type="mail" name="mail" value={mail} width={350} errorValue={mailError} errMsg="Please enter your email" row={1} multiline={false} />
                    </FormControl>

                    <FormControl>
                        <Input variant="outlined" size="small" margin="normal" label="Mobile*" type="text" name="mobile" value={mobile} width={350} errorValue={mobileError} errMsg="Please enter your mobile number" row={1} multiline={false} />
                    </FormControl>

                    <FormControl>
                        <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center", marginRight : 11}}>
                            <FormLabel>Gender* :</FormLabel>
                            <RadioGroup value={gender} row sx={{ paddingLeft: 1 }}>
                                <RadioButton value="male" label="Male" name="gender" />
                                <RadioButton value="female" label="Female" name="gender" />
                            </RadioGroup>
                        </Box>
                    </FormControl>

                    <FormControl>
                        <DropDown
                            label="City*"
                            size="small"
                            name="city"
                            value={city}
                            error={cityError}
                            items={CITY}
                        />
                        {
                            (cityError && <FormHelperText sx={{ color: "red" }}> Please select city</FormHelperText>)
                        }
                    </FormControl>

                    <FormControl>
                        <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", marginRight:29 }}>
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
                            <BtnField text="Submit" variant="contained" color="primary" size="medium" type="submit" />

                            <BtnField text="Reset" variant="contained" color="secondary" size="medium" type="reset" />
                        </Box>

                    </FormControl>
                </FormControl>
            {/* </Paper> */}
        </>
    )
}

export default Form;