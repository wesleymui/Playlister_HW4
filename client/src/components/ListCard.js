import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Divider, ListItemText, Typography } from '@mui/material';
import AuthContext from '../auth';
import { createTheme, ThemeProvider } from '@mui/system';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    const theme = createTheme ({
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
    });

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let userName = auth.user.firstName + ' ' + auth.user.lastName;
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            style={{ width: '100%', fontSize: '36pt', color: 'white' }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >
                <ListItemText 
                    primary={idNamePair.name} 
                    secondary={"By:  " + userName} 
                    primaryTypographyProps={{sx: {p: 1, paddingBottom: 0, flexGrow: 1, fontSize: 40}}}
                    secondaryTypographyProps={{sx: {paddingLeft: 1, color: 'white', fontSize: 20}}}
                />
            <Box sx={{p: 1}}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <ThumbUpIcon style={{fontSize:'36pt', color: 'white'}}/>
                </IconButton>
            </Box>
            <Box sx={{p: 1}}>
                <Typography>0</Typography>
            </Box>
            <Box sx={{p: 1}}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <ThumbDownIcon style={{fontSize:'36pt', color: 'white'}} />
                            </IconButton>
            </Box>
            <Box sx={{p: 1}}>
                <Typography>0</Typography>
            </Box>
            <Box sx={{p: 1}}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <ExpandMoreIcon style={{fontSize:'48pt', color: 'white'}} />
                            </IconButton>
            </Box>
        </ListItem>
        /*
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <EditIcon style={{fontSize:'48pt', color: 'white'}} />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <DeleteIcon style={{fontSize:'48pt', color: 'white'}} />
                        </IconButton>
                    </Box>
                    */

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48, color: 'white'}}}
                InputLabelProps={{style: {fontSize: 24, color: 'white'}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;