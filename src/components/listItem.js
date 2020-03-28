import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Label, Badge } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import commonConstants from '../util/constants';
import { blue, green, yellow, purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Form } from 'react-bootstrap';
import { MenuItem, Select } from '@material-ui/core';
import Swal from 'sweetalert2';
const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const PendingBtn = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        width: "80%",
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}))(Button);

const CompletedBtn = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        width: "80%",
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

const IncompleteBtn = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        width: "80%",
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);


class ListItems extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemList: [],
            open: false,
            row: {}
        }

    }

    openEditModal = (row_) => {
        this.setState({
            open: true,
            row: row_
        })
    }

    closeEditModal = () => {
        this.setState({
            open: false,
            row: {}
        })
    }


    componentDidMount() {
        this.getList();
    }

    getList = () => {
        let list_ = this.props.getList();

        this.setState({
            itemList: list_
        })
    }

    onDelete = (index) => {
        this.props.onRemove(index);
        this.getList();
    }

    editChanges = () => {

        if (Object.keys(this.state.row).length != 0) {
            this.props.onEdit(this.state.row);
            this.getList();
        }
        this.closeEditModal()

    }

    render() {

        let list_ = this.props.getList();

        return (
            <div style={{
                textAlign: "left",
                padding: "2%"
            }}>
                <Label style={{
                    fontWeight: "bold",
                }} >Item List</Label>
                <TableContainer component={Paper}>
                    <Table style={{
                        backgroundColor: "white",
                        borderColor: "lightBlue"
                    }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item Name</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list_.map(row => (
                                <TableRow key={row.index}>
                                    <TableCell component="th" scope="row">
                                        {(row.status === commonConstants.COMPLETED) ? <s>row.itemName</s>:row.itemName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {
                                            (row.status) === commonConstants.COMPLETED
                                                ?
                                                <CompletedBtn variant="outline" color="success"
                                                    style={{
                                                        margin: "10%",
                                                    }}>
                                                    {commonConstants.COMPLETED}
                                                </CompletedBtn>
                                                :
                                                ((row.status) === commonConstants.PENDING ?
                                                    <PendingBtn variant="outline" color="primary"
                                                        style={{
                                                            margin: "10%",
                                                        }}
                                                    >
                                                        {commonConstants.PENDING}
                                              </PendingBtn>
                                                    :
                                                    <IncompleteBtn variant="outline" color="primary"
                                                        style={{
                                                            margin: "10%",
                                                        }}
                                                    >
                                                        {commonConstants.INCOMPLETE}
                                              </IncompleteBtn>
                                                )

                                        }

                                    </TableCell>
                                    <TableCell align="center" >
                                        <Button style={{
                                            textAlign: "center"
                                        }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if(row.status != commonConstants.INCOMPLETE){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Abort!',
                                                        text: 'Only Incomplete status items can be edited!',
                                                      })
                                                }
                                                else{
                                                    this.openEditModal(row);
                                                }
                                                
                                            }}
                                            endIcon={<i class="fas fa-edit"></i>}
                                        >
                                        </Button>
                                        <Dialog onClose={this.closeEditModal} aria-labelledby="customized-dialog-title" open={this.state.open}>
                                            <DialogTitle id="customized-dialog-title" onClose={this.closeEditModal}>
                                                Edit Item
                                             </DialogTitle>
                                            <DialogContent dividers>
                                                <Form.Group>
                                                    <Form.Label style={{
                                                        fontWeight: "bold",
                                                    }}>Item Name</Form.Label>
                                                    <Form.Control type="text"

                                                        value={this.state.row.itemName}
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            let updated_row = this.state.row;
                                                            updated_row.itemName = e.target.value
                                                            this.setState({
                                                                row: updated_row
                                                            })
                                                        }}
                                                        style={{
                                                            backgroundColor: "white",
                                                            borderColor: "lightBlue"
                                                        }}
                                                    />
                                                    <Form.Label style={{
                                                        fontWeight: "bold",
                                                    }}>Item Status</Form.Label>
                                                    <br />
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={this.state.row.status}
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            let updated_row = this.state.row;
                                                            updated_row.status = e.target.value
                                                            this.setState({
                                                                row: updated_row
                                                            })
                                                        }}
                                                    >
                                                        <MenuItem value={commonConstants.PENDING}>{commonConstants.PENDING}</MenuItem>
                                                        <MenuItem value={commonConstants.COMPLETED}>{commonConstants.COMPLETED}</MenuItem>
                                                        <MenuItem value={commonConstants.INCOMPLETE}>{commonConstants.INCOMPLETE}</MenuItem>
                                                    </Select>
                                                </Form.Group>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button variant="outlined" color="primary"
                                                    onClick={this.editChanges}
                                                    endIcon={<i class="fas fa-save"></i>}
                                                >
                                                    Save Changes
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell align="center" >
                                        <Button color="secondary" style={{
                                            textAlign: "center"
                                        }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if(row.status === commonConstants.INCOMPLETE){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Abort!',
                                                        text: 'Only Pending and Completed status items can be deleted!',
                                                      })
                                                }
                                                else{
                                                    this.onDelete(row.index)
                                                }
                                                
                                            }}
                                            endIcon={<i class="fas fa-trash"></i>}
                                        >
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        );
    }

}

export default ListItems;