
import { useState } from "react"
import Modal from "./Modal";

export default function Parent() {
  const [show, setShow] = useState(false);

  return(
    <div>
      <button onClick={() => setShow(true)}>Click</button>
      <Modal show={show} setShow={setShow}>
        <p>childrenを使っています。</p>
      </Modal>
    </div>
  )
}