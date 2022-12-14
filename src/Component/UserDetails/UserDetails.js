import { useState, useEffect, forwardRef } from "react";
import { Paper, Container, TextField, InputAdornment, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DataTable from "../Table/DataTable";
import DeleteModal from "../DeleteModal/DeleteModal";
import Form from "../Form/Form";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const UserDetails = () => {
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [openForm, setOpenForm] = useState(false);
    const [updateId, setUpdateId] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [userName, setUserName] = useState("");
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

    const setUpdate = () => {
        setUpdateId(0);
    }

    const handleUpdate = (id) => {
        setUpdateId(id);
        setOpenForm(true);
    }

    const handleDelete = (id, name) => {
        setDeleteId(id);
        setUserName(name);
        setDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    }

    const deleteData = () => {
        let record = new Array();
        record = JSON.parse(localStorage.getItem('RECORD'));
        var array = record.filter(user => {
            return user.id != deleteId;
        });
        localStorage.setItem('RECORD', JSON.stringify(array));
        closeDeleteModal();
        setModalOpen(true);
        getUserData();
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
        justifyContent: "space-between"
    }

    const closeForm = () => {
        setOpenForm(false);
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

    const mainStyle = {
        zIndex: 1,
        margin: 3,
        padding: 1
    }

    const parentStyle = {
        filter: "blur(1px)",
        pointerEvents: "none"
    }

    useEffect(() => {
        getUserData();
    }, [openForm]);

    return (
        <>
            <Paper sx={(openForm) ? parentStyle : mainStyle}>
                <Box sx={headerStyle}>
                    <Box>
                        <h2>User Details</h2>
                    </Box>

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

                    <PersonAddIcon sx={{ cursor: "pointer" }} onClick={() => setOpenForm(true)} />
                </Box>

                <DataTable
                    rows={records}
                    searchData={searchRecord}
                    isSearch={isSearchAvailable}
                    noData={noData}
                    edit={handleUpdate}
                    deleteId={handleDelete}
                />

                <Snackbar open={modalOpen} autoHideDuration={3000} onClose={() => setModalOpen(false)}>
                    <Alert severity="info" sx={{ width: '100%' }}>
                        Data Updated Successfully
                    </Alert>
                </Snackbar>
            </Paper>



            {
                (openForm && <Form close={closeForm} updateId={updateId} resetId={setUpdate} />)
            }

            {
                (deleteModalOpen && <DeleteModal open={deleteModalOpen} name={userName} deleteData={deleteData} close={closeDeleteModal} />)
            }
        </>
    )
}

export default UserDetails;