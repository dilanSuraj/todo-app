import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Form, Label, Row } from 'react-bootstrap';
import uuid4 from 'uuid4'
import swal from 'sweetalert2';

class AddItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemName: ""
        }
    }

    onChange = (e) => {
        this.setState({
            itemName: e.target.value
        })
        
    }

    onSubmit = (e) => {
        
        e.preventDefault();
        let item = {
            itemName: this.state.itemName,
            status: "INCOMPLETE",
            index: uuid4()
        }
        swal.fire({
            icon: 'success',
            title: 'Successful!',
            text: 'Item added successfully!',
          })
        this.props.onAdd(item)
    }



    render() {
        return (
            <Form style={{
                textAlign: "left",
                padding: "1%"
            }}>
                <Form.Group>
                    <Form.Label style={{
                        fontWeight: "bold",
                    }}>Add Item</Form.Label>
                    <Form.Control type="text"
                        value={this.state.itemName}
                        onChange={this.onChange}
                        style={{
                            backgroundColor: "white",
                            borderColor: "lightBlue"
                        }}
                    />
                </Form.Group>
                <Button variant="outlined" color="primary"
                    onClick={this.onSubmit}
                    endIcon={<i class="fas fa-save"></i>}
                >
                    Submit
                </Button>
            </Form>
        );
    }

}

export default AddItem;