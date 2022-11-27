import { useState, useEffect } from "react";
import { Paper, Container, TextField, InputAdornment, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DataTable from "../Table/DataTable";

const UserDetails = () => {
    const [records, setRecords] = useState([]);
    const [noData, setNoData] = useState(false);
    const [searchRecord, setSearchRecord] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isSearchAvailable, setIsSearchAvailable] = useState(false);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        setIsSearch(true);
    }

    const clearSearch = () => {
        setSearchText('');
        setIsSearch(false);
        setIsSearchAvailable(false);
        setSearchRecord([]);
        setNoData(false);
    }

    const getSearchData = () => {
        let record = new Array();
        let arr = new Array();
        setIsSearchAvailable(true);
        record = JSON.parse(localStorage.getItem('RECORD'));
        record.find(user => {
            for (const item in user) {
                if (user[item] == searchText) {
                    searchRecord.push(user);
                }
            }
        })

        if (searchRecord.length == 0) {
            setNoData(true);
        }
    }

    const headerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    const getUserData = () => {
        let record = new Array();
        record = JSON.parse(localStorage.getItem('RECORD'));
        if (record.length == 0) {
            setNoData(true);
        } else {
            setRecords(record);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <>
            <Paper>
                <Container sx={headerStyle}>
                    <h2>User Details</h2>

                    <Container sx={{ display: "flex" }}>
                        <TextField
                            variant="outlined"
                            name="searchText"
                            size="small"
                            label="Search"
                            value={searchText}
                            onChange={(e) => { handleSearch(e) }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ cursor: "pointer" }} onClick={getSearchData} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {
                                            (isSearch && <CloseIcon sx={{ cursor: "pointer" }} onClick={clearSearch} />)
                                        }

                                    </InputAdornment>
                                )
                            }}
                        />
                    </Container>

                    <PersonAddIcon sx={{ cursor: "pointer" }} />
                </Container>

                <DataTable
                    rows={records}
                    searchData={searchRecord}
                    isSearch={isSearchAvailable}
                    noData={noData}
                />
            </Paper>
        </>
    )
}

export default UserDetails;