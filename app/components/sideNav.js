import * as React from 'react';
import PropTypes from 'prop-types';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import Apps from '@mui/icons-material/Apps';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Link from 'next/link';

function NavMenuButton({
                           children,
                           menu,
                           open,
                           onOpen,
                           onLeaveMenu,
                           label,
                           ...props
                       }) {
    const isOnButton = React.useRef(false);
    const internalOpen = React.useRef(open);

    const handleButtonKeyDown = (event) => {
        internalOpen.current = open;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            onOpen(event);
        }
    };

    return (
        <Dropdown
            open={open}
            onOpenChange={(_, isOpen) => {
                if (isOpen) {
                    onOpen?.();
                }
            }}
            modifiers={[
                {
                    name: 'offset',
                    options: {
                        offset: [0, 12], // Adjust the second value to control vertical distance
                    },
                },
            ]}
        >
            <MenuButton
                {...props}
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                onMouseDown={() => {
                    internalOpen.current = open;
                }}
                onClick={() => {
                    if (!internalOpen.current) {
                        onOpen();
                    }
                }}
                onMouseEnter={() => {
                    onOpen();
                    isOnButton.current = true;
                }}
                onMouseLeave={() => {
                    isOnButton.current = false;
                }}
                onKeyDown={handleButtonKeyDown}
                sx={[
                    {
                        '&:focus-visible': {
                            bgcolor: 'neutral.plainHoverBg',
                        },
                    },
                    open ? { bgcolor: 'neutral.plainHoverBg' } : { bgcolor: null },
                ]}
            >
                {children}
            </MenuButton>
            {React.cloneElement(menu, {
                onMouseLeave: () => {
                    onLeaveMenu(() => isOnButton.current);
                },
                slotProps: {
                    listbox: {
                        id: `nav-example-menu-${label}`,
                        'aria-label': label,
                    },
                },
                placement: 'bottom-end', // Drop down slightly to the right to avoid text overlap
                sx: {
                    width: 200,
                    borderRadius: '8px', // Rounded corners
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Soft shadow
                    bgcolor: 'background.paper',
                    p: 0,
                    mt: 1, // Margin from button
                },
            })}
        </Dropdown>
    );
}

NavMenuButton.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    menu: PropTypes.element.isRequired,
    onLeaveMenu: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function SideNav() {
    const [menuIndex, setMenuIndex] = React.useState(null);
    const itemProps = {
        onClick: () => setMenuIndex(null),
    };

    const createHandleLeaveMenu = (index) => (getIsOnButton) => {
        setTimeout(() => {
            const isOnButton = getIsOnButton();
            if (!isOnButton) {
                setMenuIndex((latestIndex) => {
                    if (index === latestIndex) {
                        return null;
                    }
                    return latestIndex;
                });
            }
        }, 200);
    };

    return (
        <Sheet
            sx={{
                width: "30%",
                height: "10px",
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'orange', // Light transparent background for visibility
                borderRadius: '8px',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)', // Slightly darker on hover
                },
            }}
        >
            <List>
                <ListItem>
                    <NavMenuButton
                        label="Apps"
                        open={menuIndex === 0}
                        onOpen={() => setMenuIndex(0)}
                        onLeaveMenu={createHandleLeaveMenu(0)}
                        menu={
                            <Menu onClose={() => setMenuIndex(null)}>
                                <MenuItem
                                    {...itemProps}
                                    component={Link}
                                    href="/foodcard"
                                    sx={{
                                        '&:hover': { bgcolor: 'primary.light' }, // Subtle hover effect
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Food Card
                                </MenuItem>
                                <MenuItem
                                    {...itemProps}
                                    component={Link}
                                    href="/webcam"
                                    sx={{
                                        '&:hover': { bgcolor: 'primary.light' },
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Productivity Data
                                </MenuItem>
                                <MenuItem
                                    {...itemProps}
                                    component={Link}
                                    href="/journal"
                                    sx={{
                                        '&:hover': { bgcolor: 'primary.light' },
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Journal Entries
                                </MenuItem>
                                <MenuItem
                                    {...itemProps}
                                    component={Link}
                                    href="/gallery"
                                    sx={{
                                        '&:hover': { bgcolor: 'primary.light' },
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Gallery of Aliens
                                </MenuItem>

                                <MenuItem
                                    {...itemProps}
                                    component={Link}
                                    href="/foodcard"
                                    sx={{
                                        '&:hover': { bgcolor: 'primary.light' },
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Nutrition Tracker
                                </MenuItem>


                                <MenuItem
                                    {...itemProps}
                                    component={Link}
                                    href="/meditate"
                                    sx={{
                                        '&:hover': { bgcolor: 'primary.light' },
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Meditation
                                </MenuItem>
                            </Menu>
                        }
                    >
                        <Apps />
                    </NavMenuButton>
                </ListItem>
            </List>
        </Sheet>
    );
}
