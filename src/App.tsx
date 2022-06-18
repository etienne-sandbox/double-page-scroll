import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { content } from "./content";

export function App() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftEl = leftRef.current;
    const rightEl = rightRef.current;
    if (leftEl && rightEl) {
      const height = leftEl.getBoundingClientRect().height;
      const onLeftScroll = (event: Event) => {
        const { scrollTop } = leftEl;
        rightEl.scrollTop = scrollTop + height;
      };
      leftEl.addEventListener("scroll", onLeftScroll);

      const onRightScroll = (event: Event) => {
        const { scrollTop } = rightEl;
        leftEl.scrollTop = scrollTop - height;
      };
      rightEl.addEventListener("scroll", onRightScroll);

      return () => {
        leftEl.removeEventListener("scroll", onLeftScroll);
        rightEl.removeEventListener("scroll", onRightScroll);
      };
    }
  }, []);

  return (
    <div className="fixed inset-0">
      <div
        className="w-[50%] absolute left-0 top-0 bottom-0 overflow-y-auto scrollbar-hide"
        ref={leftRef}
      >
        <Content />
      </div>
      <div
        aria-hidden
        className="w-[50%] absolute right-0 top-0 bottom-0 overflow-y-auto scrollbar-hide"
        ref={rightRef}
      >
        <Content />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="prose mx-auto py-8">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
