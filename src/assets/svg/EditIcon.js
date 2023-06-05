import React from "react"

const EditIcon = (props) => {
    return (
        <svg
      width={props.width || 20}
      height={props.height || 20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 17h7M13.25 3.508A1.554 1.554 0 0 1 14.39 3c.21 0 .42.045.616.132.195.087.373.215.522.376.15.161.268.352.35.563a1.852 1.852 0 0 1 0 1.327c-.082.21-.2.402-.35.563l-9.49 10.221L3 17l.76-3.27 9.49-10.222Z"
        stroke="#000"
        strokeOpacity={0.45}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    )
}

export default EditIcon;