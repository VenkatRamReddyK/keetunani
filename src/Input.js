import React, { useState } from 'react';
import Confetti from 'react-confetti'
import { Container, Form, Row, Col, Toast, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Input() {
    const [gender, setGender] = useState('');
    const [passCode, setpassCode] = useState("");
    const { width, height } = '100%';
    const [show, setShow] = useState(false);
    const [infoText, setinfoText] = useState('');

    // function validateForm(gender, passCode) {
    //     if (gender.length <= 3)
    //         return false;

    //     if (passCode.length <= 4)
    //         return false;

    //     console.log(gender.length, passCode.length);
    //     return true;
    // }


    function saveData() {
        document.getElementById('form').reset();
        let data = { gender: gender, passcode: passCode };
        const url = 'https://gender-reveals.s3.amazonaws.com/data/data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVOEG5XWC35GBSXXY%2F20211010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211010T155502Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=de41201250367819b4f7ec44d3e3aa6690b53d938b7933bde8d82d06b8427b84'
        axios.put(url, data).then((response) => {
            setinfoText("We saved your input");
            setShow(true);
        });
    };

    return (
        <div>
            <Confetti
                width={width}
                height={height}
                // drawShape={ctx => {
                //     ctx.beginPath()
                //     for (let i = 0; i < 22; i++) {
                //         const angle = 0.35 * i
                //         const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
                //         const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
                //         ctx.lineTo(x, y)
                //     }
                //     ctx.stroke()
                //     ctx.closePath()
                // }}
                gravity={0.09}
                tweenDuration={1000}
            />
            <div >
                <section id="cover" className="min-vh-100">
                    <div id="cover-caption">
                        <div className="container">
                            <div className="row text-white">
                                <div className="col-xl-10 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-5">
                                    <h1 className="display-4 py-2">Now it's your turn to Input</h1>
                                    <div className="px-2">
                                        <Form className="justify-content-center forms-inline" id="form">
                                            <Container>
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <label className="sr-only inputsHeading">Gender</label>
                                                            <Form.Select aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                                                                <option>Select the Gender</option>
                                                                <option value="boy">Boy</option>
                                                                <option value="girl">Girl</option>
                                                            </Form.Select>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <label className="sr-only">Passcode</label>
                                                            <input type="text" className="form-control" placeholder="********" value={passCode} onChange={(e) => setpassCode(e.target.value)} />
                                                        </div>
                                                    </Col>

                                                </Row>
                                            </Container>
                                            <Button
                                                onClick={() => saveData()}
                                                disabled={!passCode || passCode?.length < 4 || !(gender === 'boy' || gender === 'girl')}
                                                className="btn btn-primary btn-lg submitButton">
                                                Save Gender Details
                                            </Button>
                                            <Toast onClose={() => setShow(false)} show={show} delay={1000} autohide>
                                                <Toast.Header>
                                                    <h3 className="me-auto">{infoText}</h3>
                                                </Toast.Header>
                                            </Toast>
                                        </Form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}