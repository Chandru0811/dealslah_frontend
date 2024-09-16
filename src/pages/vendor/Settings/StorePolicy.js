import React, { useState, useRef, useMemo } from "react";
import {
  FaBold,
  FaItalic,
  FaQuoteRight,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaListUl,
  FaListOl,
  FaLink,
  FaGripLines,
  FaThList,
} from "react-icons/fa";
import JoditEditor from "jodit-react";

function StorePolicy() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div className="row m-0">

      <div className="col-md-12 col-12 ">
        <h3 className="text-primary mb-4">Policies Setting</h3>
        <div className="mb-5">
          <label className="form-label">
            <h5 className="">Shipping Policy</h5>
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={3}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div className="mb-5">
          <label className="form-label">
            <h5 className="">Refund Policy</h5>
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div className="mb-5">
          <label className="form-label">
            <h5 className="">Cancellation/Return/Exchange Policy</h5>
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
      </div>
    </div>
  );
}

export default StorePolicy;
