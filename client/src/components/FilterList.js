import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import LocalBar from '@material-ui/icons/LocalBar';
import Cake from '@material-ui/icons/Cake';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Volume from '@material-ui/icons/Category';
import Rum from '../icons/Whiskey.gif'
import Beer from '../icons/Beer.gif'
import Tequila from '../icons/Tequila.gif'
import Wine from '../icons/Wine.gif'
import Vodka from '../icons/Vodka.gif'
import Cordial from '../icons/Cordial.png'
import Gin from '../icons/Gin.png'
import HouseWine from '../icons/HouseWine.gif'

const useStyles = makeStyles( {
    list: {
        width: 250,
    },
    root: {
        width: '100%',
        minWidth: 360,
    },
    nested: {
        paddingLeft: '4em',
    },
    icon: {
        maxWidth: 25
    }
} );

export default function FilterList( { filterResult } ) {
    const classes = useStyles();
    const [open, setOpen] = React.useState( false );
    const [volumeOpen, setVolumeOpen] = React.useState( false );
    console.log('ya')
    function handleCategory() {
        setOpen( !open );
    }
    function handleVolumne() {
        setVolumeOpen( !volumeOpen );
    }



    return (
        <div
            className={classes.fullList}
            role="presentation"
        >
            <List className={classes.root}>
                <ListItem button onClick={handleCategory} >
                    <ListItemIcon><LocalBar /></ListItemIcon>
                    <ListItemText primary={'Description'} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => filterResult( 'Category', 'Wine-Dessert' )}>
                            <ListItemIcon>
                                <Cake />
                            </ListItemIcon>
                            <ListItemText primary="Wine-Dessert" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => filterResult( 'Category', 'Liquor-Cordial' )}>
                            <ListItemIcon>
                                <img src={Cordial} alt="" className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Liquor-Cordial" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => filterResult( 'Category', 'Wine-House' )}>
                            <ListItemIcon>
                                <img src={HouseWine} alt="" className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Wine-House" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => filterResult( 'Category', 'Liquor-Gin' )}>
                            <ListItemIcon>
                                <img src={Gin} alt="" className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Liquor-Gin" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => filterResult( 'Category', 'Liquor-Rum' )}>
                            <ListItemIcon>
                                <img src={Rum} alt="" className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Liquor-Rum" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => filterResult( 'Category', 'Beer' )}>
                            <ListItemIcon>
                                <img src={Beer} alt="" className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Beer" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => filterResult( 'Category', 'Liquor-Tequila' )}>
                            <ListItemIcon>
                                <img src={Tequila} alt="" className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Liquor-Tequila" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => filterResult( 'Category', 'Wine-Red' )}>
                            <ListItemIcon>
                                <img src={Wine} alt="" className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Wine-Red" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => filterResult( 'Category', 'Liquor-Vodka' )}>
                            <ListItemIcon>
                                <img src={Vodka} alt="" className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Vodka" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <ListItem button onClick={handleVolumne} >
                <ListItemIcon><Volume /></ListItemIcon>
                <ListItemText primary={'Volume'} />
                {volumeOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={volumeOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => filterResult( 'Volume', '1L' )}>
                        <ListItemText primary="	1L" />
                    </ListItem>
                </List>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => filterResult( 'Volume', '375ml' )}>
                        <ListItemText primary="375ml" />
                    </ListItem>
                </List>
                 <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => filterResult( 'Volume', '750ml' )}>
                        <ListItemText primary="750ml" />
                    </ListItem>
                </List>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => filterResult( 'Volume', '16oz' )}>
                        <ListItemText primary="16oz" />
                    </ListItem>
                </List>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => filterResult( 'Volume', '750ml' )}>
                        <ListItemText primary="750ml" />
                    </ListItem>
                </List>
            </Collapse>
            <Divider />
        </div>
    );
}