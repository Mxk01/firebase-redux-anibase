import { useEffect, useState } from 'react'
import './Navbar.css'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { initializeFirebase } from '../../utils/firebase'
import { Link, useHistory } from 'react-router-dom'
import { collectionGroup } from '@firebase/firestore';

function Navbar() {
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [photo, setPhoto] = useState('');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let [user, setUser] = useState('');

    initializeFirebase()


    // detects when user logged in 

    useEffect(() => {
        let auth = getAuth()
        onAuthStateChanged(auth, (user) => {

            if (!user) {
                history.push('/login')
            }
            else {
                setUser(user.displayName)
                setPhoto(user.photoURL);
                console.log(photo)
            }

        })
    }, [])





    // let username = getAuth().currentUser;

    let logout = () => {
        let auth = getAuth()
        signOut(auth).then(() => {
            history.push('/login')
            localStorage.removeItem('token')
        }
        ).catch(e => console.log(e))
    }
    return (
        <div>

            <ul className="navbar__container">
                <Link to="/" style={{
                    textDecoration: "none",
                    color: "rgb(255, 29, 86)"
                }}>
                    <li><HomeIcon style={{ fontSize: '2rem' }} /></li>
                </Link>
                <Link to="/favorites" style={{
                    textDecoration: "none",
                    color: "rgb(255, 29, 86)"
                }}><li><BookmarkIcon style={{ fontSize: '2rem' }} /></li>
                </Link>
                <Tooltip title="Account settings">

                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>

                        <Avatar sx={{ width: 32, height: 32 }}
                            src={photo}
                        >

                        </Avatar>

                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <Avatar /> {user}
                    </MenuItem>
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <Link to="/user-edit" style={{ textDecoration: "none", color: "black" }}>
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                    </Link>



                    <MenuItem onClick={() => logout()}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

            </ul >
        </div >
    )
}

export default Navbar
