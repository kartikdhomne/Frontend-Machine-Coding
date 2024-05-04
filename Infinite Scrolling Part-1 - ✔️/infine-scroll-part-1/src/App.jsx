import { useState, useEffect } from "react";
import "./App.css";

// function App() {
//   const [count, setCount] = useState(50);

//   const elements = [];
//   for (let i = 0; i < count; i++) {
//     elements.push(<div key={i}>{i + 1}</div>);
//   }

//   useEffect(() => {
//     const onscroll = () => {
//       if (
//         window.innerHeight + scrollY >=
//         window.document.body.offsetHeight - 30
//       ) {
//         setCount(count + 50);
//       }
//     };
//     window.addEventListener("scroll", onscroll);

//     return () => window.removeEventListener("scroll", onscroll); //memory cleanup function
//   });

//   return (
//     <main>
//       <h1>Infinite Scrolling Part-1</h1>
//       <div>{elements}</div>
//     </main>
//   );
// }

const Scroll = () => {
  const [count, setCount] = useState(50);

  const elements = [];

  for (let i = 0; i < count; i++) {
    elements.push(<div key={i}>{i + 1}</div>);
  }

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        window.document.body.offsetHeight - 50
      ) {
        setCount(count + 50);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [count]);

  return (
    <main>
      <h1>Infinite Scroll Part-1</h1>
      <div>{elements}</div>
    </main>
  );
};

export default Scroll;
