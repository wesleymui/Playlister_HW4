import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Button, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import AuthContext from '../auth';
import { createTheme, ThemeProvider } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WorkspaceScreen from './WorkspaceScreen';
import SongCard from './SongCard';
import EditToolbar from './EditToolbar';
import MUIDeleteModal from './MUIDeleteModal';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ editActive, setEditActive ] = useState(false);
    const [ listOpen, setListOpen] = useState(false);
    const [text, setText] = useState("");
    const { list, selected } = props;

    //retreive list pair id
    //find list from id
    //update list by id
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
            if(!selected) {
                store.setCurrentList(id);
            } else {
                store.closeCurrentList();
            }
        }
    }

    function handleAddNewSong() {
        store.addNewSong();
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

    async function handlePublishList(event, id) {

    }

    async function handleDuplicateList(event, id) {
        
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

    function handleLike(event) {
        list.likes = list.likes + 1;
        store.updateList(list._id, list);
    }

    function handleDislike(event) {
        list.dislikes = list.dislikes + 1;
        store.updateList(list._id, list);
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
            id={list._id}
            key={list._id}
            style={{ width: '100%', fontSize: '36pt', color: 'white' }}
        >
                <ListItemText 
                    primary={list.name} 
                    secondary={"By:  " + userName} 
                    primaryTypographyProps={{sx: {p: 1, paddingBottom: 0, flexGrow: 1, fontSize: 35, fontWeight: 600}}}
                    secondaryTypographyProps={{sx: {paddingLeft: 1, color: 'white', fontSize: 20}}}
                    sx={{userSelect: 'none'}}
                />
            <Box sx={{p: 1}}>
                <IconButton onClick={handleLike} aria-label='edit'>
                                <ThumbUpIcon style={{fontSize:'36pt', color: 'white'}}/>
                </IconButton>
            </Box>
            <Box sx={{p: 1}}>
                <Typography>{list.likes}</Typography>
            </Box>
            <Box sx={{p: 1}}>
                <IconButton onClick={handleDislike} aria-label='edit'>
                                <ThumbDownIcon style={{fontSize:'36pt', color: 'white'}} />
                            </IconButton>
            </Box>
            <Box sx={{p: 1}}>
                <Typography>{list.dislikes}</Typography>
            </Box>
            <Box sx={{p: 1}}>
                <ListItemButton 
                onClick={(event) => {
                    handleLoadList(event, list._id)
                }}>
                    {selected ? <ExpandLess style={{fontSize:'48pt', color: 'white'}}/> : <ExpandMore style={{fontSize:'48pt', color: 'white'}}/>}
                </ListItemButton>
            </Box>
        </ListItem>
    
    let buttonList = 
        <Stack direction='row' justifyContent='space-between'>
            <Box display="flex" 
            p={2} m={1} 
            justifyContent='flex-start' 
            alignItems='flex-start'
            >
                <EditToolbar/>
            </Box>
            <Box display="flex" 
                p={2} m={1} 
                justifyContent='flex-end' 
                alignItems='flex-end'
            >
                <Stack direction='row' spacing={2}>
                    <Button variant='contained' onClick={(event) => {
                        handlePublishList(event, list._id)
                    }}>Publish</Button>
                    <Button variant='contained'
                    onClick={(event) => {
                        handleDeleteList(event, list._id)
                    }}
                    >Delete</Button>
                    <Button variant='contained' onClick={(event) => {
                        handleDuplicateList(event, list._id)
                    }}>Duplicate</Button>
                </Stack>
            </Box>
        </Stack>
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

                    /*
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
    }*/
    //If current list is selected and is open for editing
    if(selected) {
        return (
            <div>
            {cardElement}
            <Collapse in={selected} timeout='auto' unmountOnExit>
                <List 
                    component='div'
                    disablePadding
                    id="playlist-cards"
                    sx={{ width: '100%', bgcolor: '#123456', pb: 1}}
            >
                    {
    
                        store.currentList.songs.map((song, index) => (
                            <SongCard
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                                sx={{bgcolor: 'white'}}
                            />
                        ))  
                    }
                    { buttonList }
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant='h6' sx={{pl: 4, color: 'white', userSelect: 'none'}}>Published: </Typography>
                        <Typography variant='h6' sx={{pr: 4, color: 'white', userSelect: 'none'}}>Listens: </Typography>
                    </Stack>
                </List>   
            </Collapse>
           </div>
        )
    }
    return (
        cardElement
    );
}

export default ListCard;