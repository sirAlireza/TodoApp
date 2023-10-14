import React, {useState} from "react";
import styled from "styled-components";
import {AppButton} from "../common/misc";

export interface FormData {
    text: string
}

const initialForm = {
    text: ""
}

const FormContainer = styled.div`
  border: 2px solid;
  padding: .3rem;
  border-radius: 8px;
`
const FormInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: stretch;
  border-radius: 8px;

`
const FormInput = styled.div`
  width: 100%;

  & input {
    width: 100%;
    height: 85%;
    border: 0;
    border-bottom: 1px solid;
  }

  & input:focus {
    outline: none;
    border: 0;
    border-bottom: 1px solid;
  }
`


const FormTitle = styled.h4`
  margin: .4rem 0;
  padding: 0;
`

export default function Form({onSubmit, title}: { onSubmit: (form: FormData) => void, title: string }) {
    const [form, setForm] = useState<FormData>(initialForm);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevForm => ({...prevForm, text: event.target.value}));
    };

    const handleForm = (event: React.FormEvent) => {
        event?.preventDefault()
        onSubmit?.(form)
        setForm(prevForm => ({...prevForm, text: ""}));
    }

    return <FormContainer>
        <form>
            <FormTitle>{title}</FormTitle>
            <FormInputContainer>
                <FormInput>
                    <input
                        placeholder={"Write to add a new one..."}
                        type="text"
                        onChange={handleTextChange}
                        value={form?.text}
                    />
                </FormInput>
                <div>
                    <AppButton
                        onClick={handleForm}
                        disabled={!form?.text}
                    >
                        Add
                    </AppButton>
                </div>
            </FormInputContainer>
        </form>
    </FormContainer>
}