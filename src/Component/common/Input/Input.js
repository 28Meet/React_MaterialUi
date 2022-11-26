import TextField from '@mui/material/TextField';

const Input = (props) => {
    let {variant, size, margin, label, name, type, width, value, onchange, errorvalue, onleave, errMsg, row, multiline} = props;
    
    return(
        <>
            <TextField
                variant={variant}
                size={size}
                margin={margin}
                label={label}
                rows={row}
                multiline={multiline}
                type={type}
                name={name}
                value={value}
                sx={{ width: width }}
                onChange={onchange}
                error={errorvalue}
                onBlur={onleave}
                // helperText={errorvalue && errMsg}
            >

            </TextField>
        </>
    )
}

export default Input;