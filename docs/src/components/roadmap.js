import React from "react"
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { CardHeader } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';


const styles = {
    heading: {
        marginTop: "0",
        marginBottom: "0"
    },
    parent: {
        display: "flex",
        width: "100%",
        justifyContent: "start",
        alignItems: "center",
        flexWrap: "wrap"
    },
    border: {
        minWidth: '33%',
        maxWidth: "100%",
        padding: '1em',
        margin: '1em',
        boxShadow: "rgb(204, 204, 204) 1px -3px 15px 0px", /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
    },
    button: {
        display: "block",
        marginTop: "0.5em"
    }
}

export default function Roadmap(){

    return( 
        <div style={styles.parent}>
            <Card style={styles.border}>
                <CardHeader style={styles.heading} title="Quickstart" />
                <CardContent>Get up and running in two steps
                    <Button variant="contained" color="primary" style={styles.button}>Quick start</Button>
                </CardContent>
            </Card>
            <Card style={styles.border}>
                <CardHeader style={styles.heading} title="Tutorials" />
                <CardContent>Learn the basics of tools here
                    <Button variant="contained" color="primary" style={styles.button}>Start</Button>
                </CardContent>
            </Card>
            <Card style={styles.border}>
                <CardHeader style={styles.heading} title="How To Guides" />
                <CardContent>Purpose specific guides
                    <Button variant="contained" color="primary" style={styles.button}>Go to Guides</Button>
                </CardContent>
            </Card>
            <Card style={styles.border}>
                <CardHeader style={styles.heading} title="Modules" />
                <CardContent>Get to know tools better
                    <Button variant="contained" color="primary" style={styles.button}>Deep Dive</Button>
                </CardContent>
            </Card>
            <Card style={styles.border}>
                <CardHeader style={styles.heading} title="Conceptual Guides" />
                <CardContent>In depth knowledge
                    <Button variant="contained" color="primary" style={styles.button}>Overview</Button>
                </CardContent>
            </Card>
            <Card style={styles.border}>
                <CardHeader style={styles.heading} title="FAQ" />
                <CardContent>Commonly Asked Questions
                    <Button variant="contained" color="primary" style={styles.button}>Navigate</Button>
                </CardContent>
            </Card>
        </div>
    )
}