"use client";
import React from "react";
import css from "../page.module.css";

const RenderObject = ({ object }) => {
  return (
    <div className={css.description}>
      <p>This render is coming from the Render-Object component.</p>
      <p>
        {" "}
        sending the records object through props to this component, then mapping
        the object to render the data
      </p>
      <br />
      {object.map((item) => {
        return (
          <div key={item.recordId}>
            <p>Data per recordId - {item.recordId}:</p>
            <ul style={{ paddingLeft: "40px" }}>
              {Object.entries(item.fieldData).map(([fieldName, value]) => (
                <li key={fieldName}>
                  <strong>{fieldName}:</strong> {value}
                </li>
              ))}
            </ul>
            <br />
          </div>
        );
      })}
      <p>
        New find: <strong>Object.entries</strong> --
        <br />
        Object.entries(item.fieldData): This method returns an array of a given
        object's key-value pairs as arrays. So, each field name and its value
        are accessible as fieldName and value.
      </p>
    </div>
  );
};

export default RenderObject;
