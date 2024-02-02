import './style.css';

export default function Modal({ show, setShow, children }) {
  // {children}とするだけで呼び出し元のコンポーネントの子要素を取得できる
  const closeModal = () => {
    setShow(false);
  };

  if(show) {
    return(
      <div id="overlay" onClick={closeModal}>
      <div id="content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
    );
  } else {
    return null;
  }
}