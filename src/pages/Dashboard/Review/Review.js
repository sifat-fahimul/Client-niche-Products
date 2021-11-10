import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Review = () => {
    const [rating, setRating] = useState({})
    console.log(rating);
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newRating = { ...rating };
        newRating[field] = value;
        setRating(newRating);
    }
    const handleRatingSubmit = e => {
        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(rating)
        }).then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    alert('Your Rating place successfully !')


                }
            })
        e.preventDefault();
    }
    return (
        <div>
            <div className="container">
                <div className="row my-5 py-5">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 col-12">
                        <h2>Give Your Rating</h2>
                        <Form onSubmit={handleRatingSubmit} className='text-start'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Your name</Form.Label>
                                <Form.Control onBlur={handleOnBlur} name='name' placeholder="Your Name" />
                            </Form.Group>
                            <Form.Label>Select Rating</Form.Label>
                            <Form.Select onBlur={handleOnBlur} name='rating' aria-label="Default select example">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Leave Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name='description' onBlur={handleOnBlur} placeholder='Description' />
                            </Form.Group>
                            <Button className='btn btn-success px-4' type="submit">
                                Leave Rating
                            </Button>
                        </Form>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>

        </div>
    );
};

export default Review;