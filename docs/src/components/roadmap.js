import React from "react"
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
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
        border: '1px solid black',
        minWidth: '33%',
        maxWidth: "100%",
        padding: '1em',
        margin: '1em',
        minHeight: '140px'
    }
}

export default function Roadmap(){

    return( 
        <div style={styles.parent}>
            <Box style={styles.border}>
                <h2 style={styles.heading}>Quickstart</h2>
                <p>Get up and running in two steps</p>
                <Button variant="contained" color="primary">Quick start</Button>
            </Box>
            <div style={styles.border}>
                <h2 style={styles.heading}>Tutorial</h2>
                <p>If your are new, check out Tutorials</p>
                <Button variant="contained" color="primary">Dive in</Button>
            </div>
            <div style={styles.border}>
                <h2 style={styles.heading}>How To Guides</h2>
                <p>For specific Guides, Go here</p>
                <Button variant="contained" color="primary">Take me there</Button>
            </div>
            <div style={styles.border}>
                <h2 style={styles.heading}>Modules</h2>
                <p>Know Codebase better</p>
                <Button variant="contained" color="primary">Get Started</Button>
            </div>
            <div style={styles.border}>
                <h2 style={styles.heading}>Conceptual Guides</h2>
                <p>For indepth Knowledge</p>
                <Button variant="contained" color="primary">Start</Button>
            </div>
            <div style={styles.border}>
                <h2 style={styles.heading}>FAQ</h2>
                <p>Commonly Asked questions</p>
                <Button variant="contained" color="primary">Navigate</Button>
            </div>
        </div>
    )
}