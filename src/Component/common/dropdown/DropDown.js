import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DropDown = (props) => {
    let { label, size, onchange, name, value, error, onblur, items } = props;
    return (
        <>
            <Select sx={{ textAlign : 'left', width : 350}} label={label} size={size} onChange={(e) => onchange(e)} name={name} value={value} error={error} onBlur={onblur}>
                    {
                        items.map(item => {
                            return(
                                <MenuItem value={item} key={item}>{item}</MenuItem>
                            )
                        })
                    }
            </Select>
        </>
    )
}

export default DropDown;