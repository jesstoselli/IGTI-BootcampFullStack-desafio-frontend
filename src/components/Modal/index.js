import React, { useState } from "react";
import { FiXCircle } from "react-icons/fi";

import { Container, Title, RadioButtons, Input, DateInput } from "./styles";

import Backdrop from "../Backdrop";
import { useEffect } from "react";

const Modal = ({
  show,
  operation,
  closeModal,
  submitModalForm,
  transactionToEdit,
}) => {
  const [radioBtnsValue, setRadioBtnsValue] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState();

  // const [currentTransaction, setCurrentTransaction] = useState();

  useEffect(() => {
    if (transactionToEdit) {
      // setCurrentTransaction(transactionToEdit);

      // console.log(currentTransaction);

      const {
        description,
        category,
        value,
        yearMonthDay,
        type,
      } = transactionToEdit;

      setDescription(description);
      setCategory(category);
      setValue(value);
      setDate(yearMonthDay);
      setRadioBtnsValue(type);
    }
  }, [transactionToEdit]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // console.log(transactionToEdit);

    let transaction;
    if (!transactionToEdit) {
      transaction = {
        ...transactionToEdit,
        description,
        category,
        value: Number(value),
        date,
      };
    } else {
      transaction = {
        type: radioBtnsValue,
        description,
        category,
        value: Number(value),
        date,
      };
    }

    // console.log(transaction);
    submitModalForm(transaction);
  };

  const handleFormCancel = (e) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <>
      <Container show={show}>
        <Title>
          <p> Add New Entry</p>
          <span onClick={closeModal}>
            <FiXCircle />
          </span>
        </Title>

        <form onSubmit={handleFormSubmit}>
          <RadioButtons colorToShow={radioBtnsValue}>
            <div>
              <label className='income'>
                <input
                  type='radio'
                  value='+'
                  checked={radioBtnsValue === "+"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setRadioBtnsValue(e.target.value);
                  }}
                  disabled={description !== ""}
                />
                Income
              </label>

              <label className='outcome'>
                <input
                  type='radio'
                  value='-'
                  checked={radioBtnsValue === "-"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setRadioBtnsValue(e.target.value);
                  }}
                  disabled={description !== ""}
                />
                Outcome
              </label>
            </div>
          </RadioButtons>

          <Input>
            <p>description</p>
            <input
              type='text'
              placeholder='enter description'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Input>

          <Input>
            <p>category</p>
            <input
              type='text'
              placeholder='enter category'
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
          </Input>

          <div className='doubleInputs'>
            <Input>
              <p className='valueInput'>value</p>
              <input
                className='valueInput'
                type='number'
                min='0'
                step='.01'
                placeholder='enter value'
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </Input>

            <DateInput>
              <p>date</p>
              <input
                type='date'
                id='date'
                name='date'
                onChange={(e) => {
                  // console.log(e.target.value);
                  setDate(e.target.value);
                }}
                value={date}
              />
            </DateInput>
          </div>
          <div className='buttons'>
            <button onClick={handleFormCancel}>cancel</button>
            <button type='submit'>save</button>
          </div>
        </form>
      </Container>
      <Backdrop />
    </>
  );
};

export default Modal;
