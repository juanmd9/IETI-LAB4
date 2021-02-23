import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../Copyright';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import Check from '@material-ui/icons/Check';
import DatePicker from "react-datepicker";
import { useState } from "react";
import Moment from 'moment';
import FormControl from "@material-ui/core/FormControl";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(6),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function TaskForm({setListTask}) {
    const history = useHistory();
    async function handleSubmit(e) {
        const formData = new FormData(e.target);
        e.preventDefault();
        const newTask = {};
        for (let entry of formData.entries()) {
            newTask[entry[0]] = entry[1];
        }
        console.log(newTask, "%&%&%&%&%");
        await setListTask([newTask]);
        history.push("/todo");
    }
    const classes = useStyles();
    const [description, setDescription] = useState();
    const [responsible, setResponsible] = useState();
    const [status, setStatus] = useState();
    const [startDate, setStartDate] = useState();
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    );
    return (
        <Container component="main" maxWidth="xs">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        New Task
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl margin="normal" required fullWidth>
                                    <TextField
                                        autoComplete="description"
                                        name="description"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        autoFocus
                                        onChange={setDescription}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl margin="normal" required fullWidth>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="responsible"
                                        label="Responsible"
                                        name="responsible"
                                        autoComplete="responsible"
                                        onChange={setResponsible}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl margin="normal" required fullWidth>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="status"
                                        label="Status"
                                        type="status"
                                        id="status"
                                        autoComplete="current-status"
                                        onChange={setStatus}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl margin="normal" required fullWidth>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="dueDate"
                                        label="Due Date"
                                        type="date"
                                        id="dueDate"
                                        defaultValue={Moment(new Date()).format("YYYY-MM-DD")}
                                        onChange={setStartDate}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/todo" variant="body2">
                                    Cancel
                                </Link>
                            </Grid>
                        </Grid>
                        <Fab color="primary" type="submit" aria-label="add" className={classes.fab} onSubmit={handleSubmit}>
                            <Check />
                        </Fab>
                    </form>
                </div>
            </ThemeProvider>
        </Container>
    );
}

TaskForm.propTypes = {
    setListTask: PropTypes.func.isRequired
  }