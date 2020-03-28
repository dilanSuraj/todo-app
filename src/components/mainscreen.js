import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Swal from 'sweetalert2';

import AddItem from './addItem';
import ListItems from './listItem';
import MediaQuery from 'react-responsive';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemList: []
        }
    }

    onEdit = (editedItem) => {
        let itemList_ = []
        for (let item of this.state.itemList) {
            if (item.index === editedItem.index) {
                itemList_.push(editedItem)
            }
            else {
                itemList_.push(item)
            }
        }
        this.forceUpdate()

        Swal.fire({
            icon: 'success',
            title: 'Successful!',
            text: 'Item updated successfully!',
        })
    }

    onAdd = (item) => {
        this.state.itemList.push(item);
        this.forceUpdate()
    }

    getList = () => {
        return this.state.itemList;
    }

    onRemove = (index_) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                let list_ = this.state.itemList.filter(item => item.index !== index_);
                this.setState({
                    itemList: list_
                })
                this.getList();
                this.forceUpdate();
            }
        })


    }

    render() {

        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{
                    minHeight: '100vh',
                }}
            >
                <Grid item xs={10}>
                    <Card style={{
                        margin: "auto",
                        transition: "0.3s",
                        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                        "&:hover": {
                            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                        },
                        fontFamily: "sans-serif",
                        textAlign: "center",
                        backgroundColor: "lightGrey",
                        padding: "2%",
                        borderRadius: "5%"
                    }}>
                        <CardActionArea>
                            <CardContent>

                                <div style={{
                                    backgroundColor: "white",
                                    padding: "2%",
                                    borderRadius: "5%"
                                }}>
                                    <Typography gutterBottom variant="h2" component="h2" style={{
                                        fontWeight: "bold",
                                    }}>
                                        TODO APP
              </Typography>
                                    <Typography variant="body2" component="p" >
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                                        classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                                        professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,
                                        from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
                                        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                                        (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
                                        very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from
                                        a line in section 1.10.32.
              </Typography>
                                </div>

                            </CardContent>
                        </CardActionArea>
                        <MediaQuery maxWidth={1224}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <AddItem onAdd={this.onAdd} />
                                </Grid>
                                <Grid item xs={12} >
                                    <ListItems
                                        onEdit={this.onEdit}
                                        onRemove={this.onRemove}
                                        getList={this.getList}
                                    />
                                </Grid>
                            </Grid>
                        </MediaQuery>
                        <MediaQuery minWidth={1224}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <AddItem onAdd={this.onAdd} />
                                </Grid>
                                <Grid item xs={7} style={{
                                    marginLeft: "15%"
                                }}>
                                    <ListItems
                                        onEdit={this.onEdit}
                                        onRemove={this.onRemove}
                                        getList={this.getList}
                                    />
                                </Grid>
                            </Grid>
                        </MediaQuery>
                    </Card>
                </Grid>

            </Grid>
        );
    }

}

export default MainScreen;