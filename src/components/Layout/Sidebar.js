import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import { useHistory, useLocation } from 'react-router-dom';
import { Avatar, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';

const drawerWidth = 300;

export const facultyMenu = [
    {
        name: 'Personal Information',
        icon: <HomeIcon />,
        link: '/Faculty/PersonalInfo'
    },
    {
        name: 'Educational Background',
        icon: <HomeIcon />,
        link: '/Faculty/Educational'
    },
    {
        name: 'Civil Service Eligibility',
        icon: <HomeIcon />,
        link: '/Faculty/CSE'
    },
    {
        name: 'Work Experience',
        icon: <HomeIcon />,
        link: '/Faculty/WorkExp'
    },
    {
        name: 'Trainings and Programs',
        icon: <HomeIcon />,
        link: '/Faculty/TNP'
    }
]
export const adminMenu = [
    {
        name: 'Dashboard',
        icon: <HomeIcon />,
        link: '/admin/dashboard'
    },
    {
        name: 'User Management',
        icon: <GroupsIcon />,
        link: '/admin/usermanagement'
    },
]

const Sidebar = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const { push } = useHistory()
    const { pathname } = useLocation()
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 0 },
            }}

        >
            <Toolbar />
            <Box sx={{ overflow: 'auto', mt: 2.05 }}>
                <Divider />
                <List>

                    {user.access_level === 2 && adminMenu.map((item, index) => (
                        <ListMenuItem item={item} callback={() => push(item.link)} key={index} currentRoute={pathname} />
                    ))}

                    {user.access_level === 1 && facultyMenu.map((item, index) => (
                        <ListMenuItem item={item} callback={() => push(item.link)} key={index} currentRoute={pathname} />
                    ))}
                    <div style={{ position: 'fixed', bottom: 0, width: drawerWidth }}>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={'/public/profile.png'} />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle2">{user.firstName} {user.lastName}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">{user.email}</Typography>} />
                        </ListItem>
                    </div>
                </List>
            </Box>
        </Drawer>
    )
}

const ListMenuItem = ({ item, callback, currentRoute }) => {
    return (
        <ListItem button onClick={callback} selected={currentRoute === item.link}>
            <ListItemIcon>
                {item.icon}
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle2">{item.name}</Typography>} />
        </ListItem>
    )
}

export default Sidebar