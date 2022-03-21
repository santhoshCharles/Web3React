import React from "react";
import {
  Button,
  Accordion,
  Card,
  useAccordionToggle,
  AccordionContext,
  Container,
} from "react-bootstrap";
import NotePencil from "../../assets/images/NotePencil.svg";
import TrashSimple from "../../assets/images/TrashSimple.svg";

export const FAQAccordion = (props) => {
  return (
    <>
      <Accordion>
        {props.data &&
          props.data.length > 0 &&
          props.data.map((item, index) => {
            return (
              <Card key={index}>
                <CustomToggle eventKey={index + 1}>
                  {item.question}
                </CustomToggle>
                <Accordion.Collapse eventKey={index + 1}>
                  <div>
                    <div className="p3 color_gray pt-3">{item.answer}</div>
                    {props.EditDelete && (
                      <div className="d-flex align-items-center pt-3">
                        {props &&
                          props.user &&
                          props.projectDetail &&
                          props.projectDetail.initiator === props.user._id && (
                            <>
                              <button
                                type="button"
                                className="btn btn-outline-black mr-2"
                                onClick={() =>
                                  props && props.handleDelete(item)
                                }
                              >
                                <img
                                  src={TrashSimple}
                                  alt=""
                                  className="mr-2"
                                />
                                Remove FAQ
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-black"
                                onClick={() => props && props.handleEdit(item)}
                              >
                                <img src={NotePencil} alt="" className="mr-2" />
                                Edit FAQ
                              </button>
                            </>
                          )}
                      </div>
                    )}
                  </div>
                </Accordion.Collapse>
              </Card>
            );
          })}
      </Accordion>
    </>
  );
};

function CustomToggle({ children, eventKey, callback }) {
  const currentEventKey = React.useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = currentEventKey === eventKey;
  return (
    <Accordion.Toggle
      as={Button}
      variant="re_accordionBtn"
      eventKey="0"
      className={`accordion-box p3 text-left ${
        isCurrentEventKey ? "active" : ""
      }`}
      onClick={decoratedOnClick}
    >
      {children}
    </Accordion.Toggle>
  );
}
