"use client";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller, Control } from "react-hook-form";

type FormValues = {
  content: string;
};

type Props = {
  name: keyof FormValues;
  label?: string;
  control: Control<FormValues>;
  defaultValue?: string;
};

const RTE = ({ name, label, control, defaultValue = "" }: Props) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block pl-1 mb-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "paste",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | removeformat | help",
              content_style:
                "body { font-family: Arial, sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;
