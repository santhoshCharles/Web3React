import React from "react";
import { Col, Row } from "react-bootstrap";
import { GrayChipItem } from "./ChipItem";
import { connect } from 'react-redux'
import plusBlue from "../../assets/images/plusBlue.svg";

class Chips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: props.skills && props.skills.length ? props.skills.map(skill => skill.name) : [],
            value: "",
            error: null,
        };
    }

    handleKeyDown = (evt) => {
        if (["Enter", "Tab", ",", " "].includes(evt.key)) {
            evt.preventDefault();

            var value = this.state.value.trim();

            if (value && this.isValid(value)) {
                this.setState({
                    items: [...this.state.items, this.state.value],
                    value: "",
                });
            }
            this.props.parentCallback(value);
        }
    };

    handleChange = (evt) => {
        this.setState({
            value: evt.target.value,
            error: null,
        });
    };

    handleDelete = (item) => {
        this.setState({
            items: this.state.items.filter((i) => i !== item),
        });
        this.props.parentCallback(item, true);
    };

    handlePaste = (evt) => {
        evt.preventDefault();

        var paste = evt.clipboardData.getData("text");
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter((email) => !this.isInList(email));

            this.setState({
                items: [...this.state.items, ...toBeAdded],
            });
        }
    };

    isValid(email) {
        let error = null;

        if (this.isInList(email)) {
            error = `${email} has already been added.`;
        }

        if (error) {
            this.setState({ error });

            return false;
        }

        return true;
    }

    isInList(email) {
        return this.state.items.includes(email);
    }

    isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    onChipClick = (item) => {
        this.setState({ items: [...this.state.items, item.name] })
        this.props.parentCallback(item._id);
    }

    render() {
        return (
            <>
                {this.state.items.length > 0 && (
                    <div className="d-flex align-items-center flex-wrap pb-3">
                        {this.state.items.map((item, index) => (
                            <div key={index}>
                                <GrayChipItem
                                    onClick={() => this.handleDelete(item, index)}
                                    item={item}
                                    close={true}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <Row>
                    <Col lg={this.props.lg}>
                        <input
                            className={
                                "form-control re_inputRouded " +
                                (this.state.error && " has-error")
                            }
                            value={this.state.value}
                            placeholder={this.props.placeholder}
                            onKeyDown={this.handleKeyDown}
                            onChange={this.handleChange}
                            onPaste={this.handlePaste}
                        />
                        {this.state.error && (
                            <p className="fv-help-block text-danger">{this.state.error}</p>
                        )}
                    </Col>
                </Row>
                {this.props.skills && this.props.masterDetails.values.length > 0 && (
                    <>
                        <div className="f16-400 color_blue pb-2 pt-4">
                            Skills recently added by admin
                        </div>
                        <div className="d-flex align-items-center flex-wrap pb-4">
                            {this.props.masterDetails.values.map((item, index) => (
                                <button
                                    type="button"
                                    className="re_tag_item_OutlineBlueChipItem"
                                    key={index}
                                    onClick={() => this.onChipClick(item)}
                                >
                                    <img src={plusBlue} alt="plusBlue" className="mr-2" /> {item.name}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default connect()(Chips);

















export class Chips2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            value: "",
            error: null,
            AdminItems: ["Scrum", "Lorem", "Ipsum", "Testing"],
        };
    }

    handleKeyDown = (evt) => {
        if (["Enter", "Tab", ",", " "].includes(evt.key)) {
            evt.preventDefault();

            var value = this.state.value.trim();

            if (value && this.isValid(value)) {
                this.setState({
                    items: [...this.state.items, this.state.value],
                    value: "",
                });
                this.props.parentCallback([...this.state.items, this.state.value]);
            }
        }
    };

    handleChange = (evt) => {
        this.setState({
            value: evt.target.value,
            error: null,
        });
    };

    handleDelete = (item) => {
        this.setState({
            items: this.state.items.filter((i) => i !== item),
        });
    };

    handlePaste = (evt) => {
        evt.preventDefault();

        var paste = evt.clipboardData.getData("text");
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter((email) => !this.isInList(email));

            this.setState({
                items: [...this.state.items, ...toBeAdded],
            });
        }
    };

    isValid(email) {
        let error = null;

        if (this.isInList(email)) {
            error = `${email} has already been added.`;
        }

        if (!this.isEmail(email)) {
            error = `${email} is not a valid email address.`;
        }

        if (error) {
            this.setState({ error });

            return false;
        }

        return true;
    }

    isInList(email) {
        return this.state.items.includes(email);
    }

    isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    render() {
        return (
            <>
                {this.state.items.length > 0 && (
                    <div className="d-flex align-items-center flex-wrap pb-3">
                        {this.state.items.map((item, index) => (
                            <div key={index}>
                                <GrayChipItem
                                    onClick={() => this.handleDelete(item)}
                                    item={item}
                                    close={true}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <Row>
                    <Col lg={this.props.lg}>
                        <input
                            className={
                                "form-control re_input " + (this.state.error && " has-error")
                            }
                            value={this.state.value}
                            placeholder={this.props.placeholder}
                            onKeyDown={this.handleKeyDown}
                            onChange={this.handleChange}
                            onPaste={this.handlePaste}
                        />
                        {this.state.error && (
                            <p className="fv-help-block text-danger">{this.state.error}</p>
                        )}
                    </Col>
                </Row>
                {this.props.skills && this.state.AdminItems.length > 0 && (
                    <>
                        <div className="f16-400 color_blue pb-2 pt-4">
                            Skills recently added by admin
                        </div>
                        <div className="d-flex align-items-center flex-wrap pb-4">
                            {this.state.AdminItems.map((item, index) => (
                                <button
                                    type="button"
                                    className="re_tag_item_OutlineBlueChipItem"
                                    key={index}
                                >
                                    <img src={plusBlue} alt="plusBlue" className="mr-2" /> {item}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </>
        );
    }
}
