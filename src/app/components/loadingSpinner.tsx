'use client'
import { useOrderContext } from "./orderProvider";
import Spinner from 'react-bootstrap/Spinner';


export default function LoadingSpinner() {
  const { isLoading } = useOrderContext();
  
  if (isLoading) return (
    <div
      className="position-absolute top-0 bottom-0 start-0 end-0 bg-black bg-opacity-50 d-flex"
      style={{ zIndex: "2000" }}
    >
      <Spinner animation="border" variant="info" className="m-auto opacity-100">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
