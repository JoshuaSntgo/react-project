import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import { useHistory, useLocation } from 'react-router-dom';
import { Avatar, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
const drawerWidth = 300;

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
    const navigate = useHistory()
    const { pathname } = useLocation()
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                zIndex: 0,
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}

        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <Divider />
                <List>

                    {adminMenu.map((item, index) => (
                        <ListMenuItem item={item} callback={() => navigate(item.link)} key={index} currentRoute={pathname} />
                    ))}
                    <div style={{ position: 'fixed', bottom: 0, width: drawerWidth }}>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={'/public/profile.png'} />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle2">Joshua Santiago</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">joshuasantiago@gmail.com</Typography>} />
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