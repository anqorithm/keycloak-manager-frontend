import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Grid,
    Chip,
    Box
} from '@mui/material';
import { getUsers, deleteUser, enableUser, disableUser } from '../api.js';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEnable = async (userId) => {
        try {
            await enableUser(userId);
            fetchUsers();
        } catch (error) {
            console.error('Error enabling user:', error);
        }
    };

    const handleDisable = async (userId) => {
        try {
            await disableUser(userId);
            fetchUsers();
        } catch (error) {
            console.error('Error disabling user:', error);
        }
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: '100vh',
                padding: 2,
            }}
        >
            <Grid item xs={12} md={10}>
                <Paper sx={{ width: '100%', overflowX: 'auto' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {[
                                        'Username',
                                        'First Name',
                                        'Last Name',
                                        'Email',
                                        'Email Verified',
                                        'Temporary Admin',
                                        'Created At',
                                        'Enabled',
                                        'Manage Group Membership',
                                        'View',
                                        'Map Roles',
                                        'Impersonate',
                                        'Manage',
                                        'Actions',
                                    ].map((header) => (
                                        <TableCell
                                            key={header}
                                            sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.firstName || 'N/A'}</TableCell>
                                        <TableCell>{user.lastName || 'N/A'}</TableCell>
                                        <TableCell>{user.email || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.emailVerified ? 'Yes' : 'No'}
                                                color={user.emailVerified ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {user.attributes && user.attributes.is_temporary_admin ? (
                                                <Chip
                                                    label={user.attributes.is_temporary_admin[0]}
                                                    color="primary"
                                                    size="small"
                                                />
                                            ) : (
                                                'N/A'
                                            )}
                                        </TableCell>
                                        <TableCell>{formatTimestamp(user.createdTimestamp)}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.enabled ? 'Yes' : 'No'}
                                                color={user.enabled ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.access.manageGroupMembership ? 'Yes' : 'No'}
                                                color={user.access.manageGroupMembership ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.access.view ? 'Yes' : 'No'}
                                                color={user.access.view ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.access.mapRoles ? 'Yes' : 'No'}
                                                color={user.access.mapRoles ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.access.impersonate ? 'Yes' : 'No'}
                                                color={user.access.impersonate ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.access.manage ? 'Yes' : 'No'}
                                                color={user.access.manage ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', width: '100%' }}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => handleEnable(user.id)}
                                                    disabled={user.enabled}
                                                    sx={{
                                                        flex: 1,
                                                        minWidth: 0,
                                                        marginRight: 0.5,
                                                        fontSize: '0.7rem',
                                                        padding: '4px 4px',  
                                                    }}
                                                >
                                                    Enable
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDisable(user.id)}
                                                    disabled={!user.enabled}
                                                    sx={{
                                                        flex: 1,
                                                        minWidth: 0,
                                                        marginRight: 0.5,
                                                        fontSize: '0.7rem',
                                                        padding: '4px 4px',  
                                                    }}
                                                >
                                                    Disable
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={() => handleDelete(user.id)}
                                                    sx={{
                                                        flex: 1,
                                                        minWidth: 0,
                                                        fontSize: '0.7rem',
                                                        padding: '4px 4px',  
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UsersList;
