import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { useSelector } from "react-redux";




const SimpleModel = ({ show, handleClose, children, screenWidthValue }) => {



const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: screenWidthValue,
    height: "auto",
    maxHeight: "100%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    zIndex: "999",
    transform: "translate(-50%, -50%)",
  },
  
};

  const LocalSearchInfo = useSelector(
    (state) => state.LocationStoreReducer.LocalSearchInfo
  );

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={show}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={handleClose}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        // className="modalSimple"
        contentLabel="Example Modal"
        ariaHideApp={false}
      
      >
        <Button
          style={{margin:"10px",
          zIndex: "999",
          position: "absolute",
          right: "1rem"
      }}
          variant="success"
          disabled={LocalSearchInfo !== null ? false : true}
          onClick={handleClose}
        >
          <i  className="fa fa-times  " aria-hidden="true"></i>

        </Button>

        {children}
      </Modal>
    </div>
  );
};

export default SimpleModel;

// import { Modal } from "react-bootstrap";
// import React from "react";

// /**
//  * @param show boolean like true
//  * @param handleClose function
//  * @param size string like "md", "lg", "xl"
//  * @param id number nullable
//  * @returns SimpleMOdal
//  */
// const SimpleModel = ({
//   show,
//   handleClose = null,
//   size = "md",
//   id,
//   children,
//   isCloseButton = true,
// }) => {
//   return (
//     <Modal
//       onClose={handleClose}
//       size={size}
//       show={show}
//       onHide={handleClose}
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Body>
//         {isCloseButton === true && (
//           <div
//             className="modal_Close_btn pointer"
//             onClick={() => handleClose()}
//           >
//             <i className="fas fa-times"></i>
//           </div>
//         )}

//         {children}
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default SimpleModel;
