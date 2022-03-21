import React from "react"
import { Container } from "react-bootstrap"

export const PageTitle = (props) => {
    return (
        <section className="re_titleMain">
            <Container>
                <div className="h1 text-white">{props.title}</div>
            </Container>
        </section>
    )
}