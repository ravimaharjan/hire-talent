import React, { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Input, Label } from "reactstrap";
import { updateExperience, addExperience, updateExperienceLocally } from "./expSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MultiLineComponent from "../../components/MultiLine";

const Experience = ({ profile }) => {

    const dispatch = useDispatch();
    const experienceData = useSelector((state) => state.experience.experienceData);

    const [isEditing, setIsEditing] = useState([]); // Array of booleans
    const [isAdding, setIsAddingExperience] = useState(false);
    const [newExperience, setNewExperience] = useState({
        'title': '',
        'companyName': '',
        'description': '',
        'startDate': '',
        'endDate': ''

    })
    const [value, onChange] = useState(new Date());
    const [isOpen, setIsOpen] = useState({
        startDate: false,
        endDate: false,
    });
    const [startDate, setStartDate] = useState(new Date());

    const mappedField = (field) => {
        const map = {
            'Title': 'title',
            'Company Name': 'companyName',
            'Description': 'description',
            'Start Date': 'startDate',
            'End Date': 'endDate'
        }

        return map[field];
    }

    // console.log('experience data', experienceData)
    if (!experienceData || experienceData.length === 0)
        return null;


    const handleEdit = (e, index) => {
        const newEditingState = [...isEditing];
        newEditingState[index] = true;
        setIsEditing(newEditingState);
    };

    const handleCancel = (e, index) => {
        const newEditingState = [...isEditing];
        newEditingState[index] = false;
        setIsEditing(newEditingState);
    };

    const handleSave = (e, index) => {
        const updatedExperience = experienceData[index];
        dispatch(updateExperience(updatedExperience));
        handleCancel(index);
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedExperience = {
            ...experienceData[index],
            [name]: value,
        };
        dispatch(updateExperienceLocally({ index, updatedExperience }));

    }

    const handleAddExpClick = (e) => {
        setIsAddingExperience(!isAdding);
    }

    const handleNewExpChange = (e) => {
        const experience = {
            ...newExperience,
            [e.target.name]: e.target.value
        }
        setNewExperience(experience);
    }

    const handleAddNewExperience = () => {
        dispatch(addExperience(newExperience));
        setIsAddingExperience(false);
        setNewExperience({
            title: "",
            companyName: "",
            description: "",
            startDate: "",
            endDate: ""
        });
    }

    const cancelNewExperience = (e) => {
        setIsAddingExperience(false);
    }

    const formatDate = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateChange = (date, dateName) => {
        const experience = {
            ...newExperience,
            [dateName]: formatDate(date)
        }
        setNewExperience(experience);
    }



    const handleCalendarToggle = (name, open) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [name]: open,
        }));
    };

    return (
        <div className=" con profile-page">
            <div>
                <h3>Experience</h3>
            </div>
            <div>
                {
                    isAdding ? (
                        <>
                            <div style={{ padding: "5px 0px 20px 0px", textAlign: "end" }}>
                                <Button color="success" onClick={handleAddNewExperience} className="mr-2">
                                    Save
                                </Button>

                                <Button color="success" onClick={cancelNewExperience} className="mr-2">
                                    Cancel
                                </Button>

                            </div>
                            <div>
                                <Label >Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={newExperience["title"]}
                                    onChange={handleNewExpChange}
                                    className="input-control"
                                />
                                <Label>Company Name</Label>

                                <Input
                                    type="text"
                                    name="companyName"
                                    value={newExperience["companyName"]}
                                    onChange={handleNewExpChange}
                                    className="input-control"
                                />
                                <div>
                                    <Label>Start Date</Label>
                                    <DatePicker
                                        showIcon
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)

                                        } />

                                    <Label>End Date</Label>
                                    <DatePicker
                                        showIcon
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)

                                        } />
                                </div>
                                <div>
                                    <Label>Description</Label>

                                    <Input
                                        type="textarea"
                                        name="description"
                                        value={newExperience["description"]}
                                        onChange={handleNewExpChange}
                                        className="input-control"
                                        style={{ width: "90%", height: "200px", margin: "10px 0px 20px 0px" }}
                                    />
                                </div>
                            </div>


                        </>
                    ) : <div style={{ padding: "5px 0px 20px 0px", textAlign: "end" }}>
                        <div className="fa-div">
                            <FontAwesomeIcon
                                icon={faPlus}
                                onClick={handleAddExpClick}
                                className="fa-icon"
                                title="Add Experience"
                            />

                        </div>

                    </div>

                }

            </div >
            {
                experienceData.map((work, index) => (
                    <Row>
                        <Col md={10} >

                            <div key={work.id} className="mb-3">
                                {isEditing[index] ? (
                                    <div>
                                        <div>
                                            <strong>Title</strong>

                                            <Input
                                                type="text"
                                                name="title"
                                                value={work["title"]}
                                                onChange={(e) => handleChange(e, index)}
                                                className="input-control"
                                            />
                                        </div>
                                        <div>
                                            <strong>Company Name</strong>

                                            <Input
                                                type="text"
                                                name="companyName"
                                                value={work["companyName"]}
                                                onChange={(e) => handleChange(e, index)}
                                                className="input-control"
                                            />
                                        </div>
                                        <div>
                                            <strong>Date</strong>

                                            <Input
                                                type="text"
                                                name="date"
                                                value={work["title"]}
                                                onChange={(e) => handleChange(e, index)}
                                                className="input-control"
                                            />
                                        </div>

                                        <div>
                                            <strong>Description</strong>

                                            <Input
                                                type="textarea"
                                                name="description"
                                                value={work["description"]}
                                                onChange={(e) => handleChange(e, index)}
                                                className="input-control-textarea "
                                            />
                                        </div>
                                        <hr />

                                    </div>
                                ) : (

                                    <div style={{ padding: "20px 10px" }}>
                                        <div style={{ fontSize: "1rem", fontWeight: "bold" }}>{work.title}</div>
                                        <div>{work.companyName}</div>
                                        <div><MultiLineComponent text={work.description} /> </div>
                                        <hr />

                                    </div>
                                )
                                }
                            </div>
                        </Col>
                        <Col md={2}>
                            {
                                isEditing[index] ? (
                                    <>
                                        <Button color="success" onClick={(e) => handleSave(e, index)} className="mr-2">
                                            Save
                                        </Button>
                                        <Button color="secondary" onClick={(e) => handleCancel(e, index)}>
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <div className="fa-div"
                                    >
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            onClick={(e) => handleEdit(e, index)}
                                            className="fa-icon"
                                            title="Edit Experience" />

                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="fa-icon"
                                            title="Delete Experience"

                                        />
                                    </div>

                                )
                            }
                        </Col>
                    </Row>
                ))
            }

        </div >
    )
}



export default Experience;
